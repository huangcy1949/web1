import React, {Component} from 'react';
import {Operator, ListPage, ToolItem} from 'sx-antd';
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


    // TODO 查询条件
    queryItems = [
        [
            {
                type: 'input',
                field: 'name',
                label: '姓名',
                labelSpaceCount: 4,
                width: 200,
                placeholder: '请输入姓名',
            },
            {
                type: 'input',
                field: 'age',
                label: '年龄',
                labelSpaceCount: 4,
                width: 200,
                placeholder: '请输入年龄',
            },
            {
                type: 'input',
                field: 'job',
                label: '工作',
                labelSpaceCount: 4,
                width: 200,
                placeholder: '请输入工作',
            },
        ],
    ];

    // TODO 顶部工具条
    toolItems = [
        {
            type: 'primary',
            text: '添加',
            icon: 'plus',
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
            icon: 'export',
            onClick: () => {
                // TODO
            },
        },
    ];

    columns = [
        {title: '姓名', dataIndex: 'name'},
        {title: '年龄', dataIndex: 'age'},
        {title: '工作', dataIndex: 'job'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const {id, name} = record;
                const successTip = `删除“${name}”成功！`;
                const items = [
                    {
                        label: '修改',
                        onClick: () => {
                            this.props.history.push(`/user-center/+edit/${id}`);
                        },
                    },
                    {
                        label: '删除',
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
                    showSearchButton
                    showResetButton={false}
                    queryItems={this.queryItems}
                    toolItems={this.toolItems}
                    onSearch={this.handleSearch}
                    total={total}
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
