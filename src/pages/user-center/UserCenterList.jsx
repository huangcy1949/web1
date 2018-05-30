import React, {Component} from 'react';
import {Operator, ListPage, ToolItem} from 'sx-antd';
import FixBottom from '../../layouts/fix-bottom';
import PageContent from '../../layouts/page-content';
import {ajaxHoc} from '../../commons/ajax';

export const PAGE_ROUTE = '/user-center';

@ajaxHoc()
export default class UserCenterList extends Component {

    state = {
        loading: false,
        dataSource: [],
        total: 0,
    };

    // TODO 查询条件
    queryItems = [
        [
            {
                type: 'input',
                field: 'fileType',
                label: '类型',
                labelSpaceCount: 4,
                width: 200,
                placeholder: '请输入类型',
            },
            {
                type: 'input',
                field: 'fieldName',
                label: '名称',
                labelSpaceCount: 4,
                width: 200,
                placeholder: '请输入名称',
            },
        ],
    ];

    // TODO 顶部工具条
    toolItems = [
        {
            type: 'primary',
            text: '添加用户',
            icon: 'plus',
            onClick: () => {
                // TODO
            },
        },
    ];

    // TODO 底部工具条
    bottomToolItems = [
        {
            type: 'default',
            text: '导出',
            icon: 'export',
            onClick: () => {
                // TODO
            },
        },
    ];

    columns = [
        {title: '类型', dataIndex: 'fileType'},
        {title: '名称', dataIndex: 'fieldName'},
        {title: '描述', dataIndex: 'fieldDes'},
        {title: '路径', dataIndex: 'filePath'},
        {title: '创建人', dataIndex: 'creater'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const {id, fileType} = record;
                const successTip = `删除“${fileType}”成功！`;
                const items = [
                    {
                        label: '修改',
                        onClick: () => {
                            this.props.history.push(`/user-center/+edit/${id}`);
                        },
                    },
                    {
                        label: '删除',
                        color: 'red',
                        confirm: {
                            title: `您确定要删除“${fileType}”？`,
                            onConfirm: () => {
                                this.props.ajax.del(`/mock/user-center/${id}`, null, {successTip});
                            },
                        },
                    },
                ];

                return (<Operator items={items}/>);
            },
        },
    ];

    handleSearch = (params) => {
        this.setState({loading: true});
        this.props.ajax
            .get('/mock/user-center', params)
            .then(res => {
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
            total,
            dataSource,
            loading,
        } = this.state;

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
                        rowKey: 'id',
                    }}
                />
                <FixBottom right>
                    <ToolItem items={this.bottomToolItems}/>
                </FixBottom>
            </PageContent>
        );
    }
}
