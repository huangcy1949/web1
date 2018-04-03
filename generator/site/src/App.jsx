import React, {Component} from 'react';
import {LocaleProvider, Spin} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import api from './api/api-hoc';
import Router from './router/Router';
import {connect} from "./models";

@connect()
@api()
export default class App extends Component {
    state = {
        loading: false,
        hasError: false,
    };

    /**
     * 只捕获渲染周期过程中的异常
     *
     * Error boundaries do not catch errors for:
     *
     * 1. Event handlers (learn more) 事件处理函数并不属于react渲染的一部分，所以不捕获
     * 2. Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
     * 3. Server side rendering
     * 4. Errors thrown in the error boundary itself (rather than its children)
     *
     * @param error
     * @param info
     */
    componentDidCatch(error, info) {
        // 可以基于 hasError 展示出错UI
        this.setState({hasError: true});
        // 可以将错误上报服务器
        // logErrorToMyService(error, info);
    }

    render() {
        const {loading, hasError} = this.state;
        // TODO 完善崩溃页面
        if (hasError) {
            return '页面崩溃了。。。（崩溃信息需要完善）';
        }
        return (
            <LocaleProvider locale={zhCN}>
                {loading ? (
                    <Spin
                        style={{position: 'absolute', left: '50%', top: '30%'}}
                        tip="Loading..."
                        size={'large'}/>
                ) : <Router/>
                }
            </LocaleProvider>
        );
    }
}
