import React, {Component} from 'react';

export const PAGE_ROUTE = '/example/users';

export default class UserList extends Component {
    constructor(...args) {
        super(...args);

        this.props.action.page.setTitle('重新设置的title');
    }

    render() {
        return (
            <div>用户列表</div>
        );
    }
}
