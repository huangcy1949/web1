import React, {Component} from 'react';
import {Operator, ListPage, ToolItem} from 'sx-antd';
import {hasPermission} from '../../../commons';
import FixBottom from '../../../layouts/fix-bottom';
import PageContent from '../../../layouts/page-content';
import {connect} from '../../../models';

export const PAGE_ROUTE = '/user-center';

@connect(state => ({
    dataSource: state.userCenter.dataSource,
    total: state.userCenter.total,
    loading: state.userCenter.loading,
}))
export default class UserCenterList extends Component {
    state = {
        params: {
            pageNum: 1,
        },
    };

    // TODO 查询条件
    queryItems = [
        [
            {
                type: 'input',
                field: 'name',
                label: '用户名',
                labelSpaceCount: 4,
                width: 200,
                placeholder: '请输入用户名',
            },
            {
                type: 'input',
                field: 'age',
                label: '年龄',
                labelSpaceCount: 4,
                width: 200,
                placeholder: '请输入年龄',
            },
        ],
    ];

    // TODO 顶部工具条
    toolItems = [
        {
            type: 'primary',
            text: '添加',
            icon: '',
            onClick: () => {
                // TODO
            },
        },
    ];

    // TODO 底部工具条
    bottomToolItems = [
        {
            type: 'primary',
            text: '导出',
            icon: '',
            onClick: () => {
                // TODO
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
                            this.props.history.push(`/user-center/+edit/${id}`);
                        },
                    },
                    {
                        label: '删除',
                        visible: hasPermission('USER_CENTER_DELETE'),
                        confirm: {
                            title: `您确定要删除“${name}”？`,
                            onConfirm: () => {
                                this.props.action.userCenter.deleteById({params: {id}, successTip});
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
        const {pageNum} = this.state.params;

        return (
            <PageContent>
                <ListPage
                    showSearchButton
                    showResetButton={false}
                    queryItems={this.queryItems}
                    toolItems={this.toolItems}
                    onSearch={params => this.handleSearch({...params, pageNum: 1})}
                    total={total}
                    pageNum={pageNum}
                    onPageNumChange={pn => this.handleSearch({pageNum: pn})}
                    tableProps={{
                        loading,
                        columns: this.columns,
                        dataSource,
                        // TODO 这个rowKey未必正确
                        rowKey: record => record.id,
                    }}
                />
                <FixBottom right>
                    <ToolItem items={this.bottomToolItems}/>
                </FixBottom>
            </PageContent>
        );
    }
}
