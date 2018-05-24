import React, {Component} from 'react';
import {ListPage, Operator} from 'sx-antd';
import PageContent from '../../layouts/page-content';
import {ajaxHoc} from "../../commons/ajax";

export const PAGE_ROUTE = '/example/users';

@ajaxHoc()
export default class UserList extends Component {

    state = {
        loading: false,
        dataSource: [],
        total: 0,
    };

    queryItems = [
        [
            {type: 'input', field: 'name', label: '姓名'},
            {type: 'number', field: 'age', label: '年龄'},
        ]
    ];

    toolItems = [
        {
            type: 'primary',
            text: '添加',
            icon: 'plus',
            onClick: () => {
                this.props.history.push('/user-center/+edit/:id');
            },
        },
        {
            type: 'primary',
            text: '隐藏页面头部',
            onClick: () => {
                this.props.action.page.hideHead();
            },
        },
        {
            type: 'primary',
            text: '修改页面title',
            onClick: () => {
                this.props.action.page.setTitle('修改过的title');
            },
        }
    ];

    columns = [
        {title: '姓名', dataIndex: 'name', key: 'name'},
        {title: '年龄', dataIndex: 'age', key: 'age'},
        {title: '工作', dataIndex: 'job', key: 'job'},
        {
            title: '操作', key: 'operator',
            render: (text, record) => {
                const {name} = record;
                const items = [
                    {
                        label: '详情',
                        onClick: () => {
                            alert('跳转详情');
                        }
                    },
                    {
                        label: '删除',
                        color: 'red',
                        confirm: {
                            title: `您确定要删除“${name}”？`,
                            onConfirm: () => {
                                alert('删除');
                            },
                        },
                    },
                    {
                        isMore: true,
                        label: '审批',
                        onClick: () => {
                            alert('审批');
                        },
                    }
                ];

                return <Operator items={items}/>
            },
        }
    ];

    handleSearch = (params) => {
        console.log(params);

        this.setState({loading: true});
        this.props.ajax
            .get('/mock/user-center', params)
            .then((res) => {
                if (res) {
                    const {list: dataSource, total} = res;
                    this.setState({
                        dataSource,
                        total,
                    });
                }
            })
            .finally(() => this.setState({loading: false}));
    };

    render() {
        const {
            loading,
            dataSource,
            total,
        } = this.state;

        return (
            <PageContent>
                <ListPage
                    queryItems={this.queryItems}
                    toolItems={this.toolItems}
                    tableProps={{
                        loading,
                        columns: this.columns,
                        dataSource,
                    }}
                    total={total}
                    onSearch={this.handleSearch}
                />
            </PageContent>
        );
    }
}
