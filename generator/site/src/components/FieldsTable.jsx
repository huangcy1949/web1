import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table, Button, Input, Form} from 'antd';
import {Operator, FormItemLayout} from 'sx-antd';
import uuid from 'uuid/v4';

import './FieldsTable.less';

@Form.create()
export default class FieldsTable extends Component {
    static propTypes = {
        value: PropTypes.array,
        onChange: PropTypes.func,
    };

    static defaultProps = {};

    state = {
        newRow: void 0,
    };

    columns = [
        {
            title: '字段名', dataIndex: 'dataIndex', key: 'dataIndex', width: '40%',
            render: (text, record) => this.renderColumns(text, record, 'dataIndex', '请输入字段名'),
        },
        {
            title: '中文名', dataIndex: 'title', key: 'title', width: '40%',
            render: (text, record) => this.renderColumns(text, record, 'title', '请输入中文名'),
        },
        {
            title: '操作',
            width: '20%',
            render: (text, record) => {
                const {value} = this.props;
                const items = [
                    {
                        disabled: (!value || value.length <= 1),
                        label: '删除',
                        confirm: {
                            title: `您确定要删除${record.title}吗？`,
                            onConfirm: () => {
                                this.handleDelete(record);
                            },
                        },
                    },
                ];
                return <Operator items={items}/>;

            },
        },
    ];

    componentWillMount() {
        const {formRef, form} = this.props;
        formRef(form);
    }

    renderColumns(text, record, column, message) {
        const {form: {getFieldDecorator}, value, onChange} = this.props;
        const {id} = record;
        const field = `${column}-${id}`;

        return (
            <FormItemLayout
                labelWidth={0}
            >
                {getFieldDecorator(field, {
                    rules: [
                        {required: true, message,},
                    ],
                    onChange: (e) => {
                        const v = e.target.value;
                        const r = value.find(item => item.id === record.id);
                        r[column] = v;
                        onChange(value);
                    },
                })(
                    <Input placeholder={message}/>
                )}
            </FormItemLayout>
        );
    }

    handleDelete = (record) => {
        const {value, onChange} = this.props;
        const newValue = value.filter(item => item.id !== record.id);
        onChange(newValue);
    };

    handleAddNewRow = () => {
        const {value, onChange} = this.props;
        onChange([...value, {id: uuid(), title: '', dataIndex: ''}]);
    };

    render() {
        const {
            value,
            onChange,
            hasError,
            style,
            formRef,
            ...others
        } = this.props;

        const {newRow} = this.state;
        const tableStyle = {marginBottom: '5px', ...style};
        const dataSource = [...value];

        if (newRow) dataSource.push(newRow);
        if (hasError) tableStyle.border = '1px solid #f5222d';

        return (
            <Table
                styleName="root"
                style={tableStyle}
                {...others}
                bordered
                columns={this.columns}
                dataSource={dataSource}
                pagination={false}
                rowKey={record => record.id}
                footer={() => (
                    <Button
                        icon="plus"
                        style={{width: '100%', height: '80px', lineHeight: '80px'}}
                        type="dashed"
                        onClick={this.handleAddNewRow}
                    >添加</Button>
                )}
            />
        );
    }
}
