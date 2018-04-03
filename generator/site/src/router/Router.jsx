import React, {Component} from 'react';
import {
    Router,
    Route,
    Switch,
    withRouter
} from 'react-router-dom'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import {createBrowserHistory, createHashHistory} from 'history'

import {connectComponent} from '../models';
import Bundle from './Bundle'
import pageRoutes from '../pages/page-routes.js'
import routes from '../pages/routes';
import Error404 from '../pages/error/Error404';
import {ajaxHoc} from '../commons/ajax';
import service from '../api/api-hoc';

const allRoutes = pageRoutes.concat(routes);

let history = createBrowserHistory();

// 发布到git page 时，使用HashRouter
if (process.env.REACT_APP_BUILD_ENV === 'preview') {
    history = createHashHistory();
}

const renderBundle = (props) => (Com) => {
    if (!Com) {
        NProgress.start();
        return null;
    }
    NProgress.done();

    // 各种高阶函数包装，方便调用相关方法
    Com = service()(ajaxHoc()(withRouter(connectComponent(Com))));
    return <Com {...props}/>;
};

export default class extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    {allRoutes.map(item => (
                        <Route key={item.path} exact path={item.path} component={(props) => <Bundle load={item.getComponent}>{renderBundle(props)}</Bundle>}/>
                    ))}
                    <Route component={Error404}/>
                </Switch>
            </Router>
        );
    }
}