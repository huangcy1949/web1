import React, {Component} from 'react';
import {Button} from 'antd';
import {Operator, ListPage} from 'sx-antd';
import {hasPermission} from '../../commons';
import FixBottom from '../../layouts/fix-bottom';
import PageContent from '../../layouts/page-content';
import {connect} from '../../models';

export const PAGE_ROUTE = '/user-center';

@connect(state => ({
    dataSource: state.userCenter.dataSource,
    total: state.userCenter.total,
    loading: state.userCenter.loading,
}))
export default class UserCenterList extends Component {
    state = {};

    // TODO 查询条件
    queryItems = [
        [
            {
                type: 'input',
                field: 'name',
                label: '名称',
                labelSpaceCount: 4,
                width: 200,
                placeholder: '请输入名称',
            },
        ],
    ];

    // TODO 工具条
    toolItems = [
        {
            type: 'primary',
            text: '添加',
            icon: 'fa-plus',
            visible: hasPermission('USER_CENTER_ADD'),
            onClick: () => {
                this.props.router.push('/userCenters/+edit/:id');
            },
        },
    ];

    columns = [
        {title: '用户名', dataIndex: 'name'},
        {title: '年龄', dataIndex: 'age'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const {id, name} = record;
                const successTip = `删除“${name}”成功！`;
                const items = [
                    {
                        label: '修改',
                        visible: hasPermission('USER_CENTER_UPDATE'),
                        onClick: () => {
                            this.props.router.push(`/userCenters/+edit/${id}`);
                        },
                    },
                    {
                        label: '删除',
                        visible: hasPermission('USER_CENTER_DELETE'),
                        confirm: {
                            title: `您确定要删除“${name}”？`,
                            onConfirm: () => {
                                this.props.actions.userCenter.deleteById({params: {id}, successTip});
                            },
                        },
                    },
                ];

                return (<Operator items={items}/>);
            },
        },
    ];

    handleSearch = (params) => {
        params = {...this.state.params, ...params};
        this.setState({params});

        this.props.action.userCenter.getByPage({params});
    };

    render() {
        const {
            total,
            dataSource,
            loading,
        } = this.props;

        return (
            <PageContent>
                <ListPage
                    loading={loading}
                    queryItems={this.queryItems}
                    showSearchButton
                    showResetButton={false}
                    toolItems={this.toolItems}
                    columns={this.columns}
                    onSearch={this.handleSearch}
                    dataSource={dataSource}
                    rowKey={record => record._id}
                    total={total}
                />
                <FixBottom right>
                    <Button type="danger">批量删除</Button>
                    <Button type="primary">导出</Button>
                </FixBottom>
            </PageContent>
        );
    }
}
