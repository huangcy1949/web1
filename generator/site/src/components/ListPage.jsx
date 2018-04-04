import React, {Component} from 'react';
import {
    Form,
    Input,
    Row,
    Col,
    TreeSelect,
    Tooltip,
    Icon,
    Button,
} from 'antd';
import uuid from 'uuid/v4';
import {FormItemLayout, Operator} from 'sx-antd';
import EditableTable from './EditableTable';
import {connect} from "../models";

@connect(state => ({
    baseInfo: state.baseInfo,
    listPage: state.listPage,
    srcDirectories: state.generator.srcDirectories,
}))
@Form.create({
    mapPropsToFields: (props) => {
        const fields = {};
        const listPage = props.listPage;

        [
            'ajaxUrl',
            'routePath',
            'outPutDir',
            'outPutFile',
            'template',
            'fields',
            'queryItems',
        ].forEach(key => {
            fields[key] = Form.createFormField({
                ...listPage[key],
                value: listPage[key].value,
            });
        });

        return fields;
    },
    onFieldsChange: (props, fields) => {
        props.action.listPage.setFields(fields);
    },
})
export default class ListPage extends Component {
    state = {};

    fieldsColumns = [
        {
            title: '字段名',
            dataIndex: 'dataIndex',
            key: 'dataIndex',
            width: '40%',
            props: {
                type: 'input',
                placeholder: '请输入字段名',
                decorator: {
                    rules: [
                        // TODO 字段名合法性校验
                        {required: true, message: '请输入字段名！'},
                        {
                            validator: (rule, value, callback) => {
                                const {fields} = this.props.listPage;
                                let count = 0;

                                fields.value.forEach(item => {
                                    if (item.dataIndex === value) count += 1;
                                });

                                count === 2 ? callback('不可添加重复字段名！') : callback();
                            },
                        }
                    ],
                },
            },
        },
        {
            title: '中文名',
            dataIndex: 'title',
            key: 'title',
            width: '40%',
            props: {
                type: 'input',
                placeholder: '请输入中文名',
                decorator: {
                    rules: [
                        {required: true, message: '请输入中文名！'},
                    ],
                },
            },
        },
        {
            title: '操作',
            width: '20%',
            dataIndex: 'operator',
            render: (text, record) => {
                const {id, title, dataIndex} = record;
                const {form: {getFieldValue, setFieldsValue}} = this.props;
                const value = getFieldValue('fields');

                const {queryItems} = this.props.listPage;
                const queryItemExist = queryItems.value.find(item => item.field === dataIndex);

                const deleteItem = {
                    disabled: (!value || value.length <= 1), // 只用一个字段时，不予许删除
                    label: '删除',
                    confirm: {
                        title: `您确定要删除"${title || dataIndex}"吗？`,
                        onConfirm: () => {
                            const newValue = value.filter(item => item.id !== id);
                            setFieldsValue({fields: newValue});
                        },
                    },
                };

                // 什么信息没填写，直接删除
                if (!title && !dataIndex) {
                    Reflect.deleteProperty(deleteItem, 'confirm');
                    deleteItem.onClick = () => {
                        const newValue = value.filter(item => item.id !== id);
                        setFieldsValue({fields: newValue});
                    };
                }

                const items = [
                    deleteItem,
                    {
                        disabled: queryItemExist || !dataIndex,
                        label: '作为条件',
                        onClick: () => {
                            const items = [...queryItems.value];
                            items.push({
                                id: uuid(),
                                label: title,
                                field: dataIndex,
                                type: 'input',
                            });
                            console.log(items);
                            setFieldsValue({queryItems: items});
                        },
                    },
                ];
                return <Operator items={items}/>;

            },
        },
    ];

    queryItemsColumns = [
        {
            title: '字段名',
            dataIndex: 'field',
            key: 'field',
            width: '25%',
            props: {
                type: 'input',
                placeholder: '请输入字段名',
                decorator: {
                    rules: [
                        // TODO 字段名合法性校验
                        {required: true, message: '请输入字段名！'},
                        {
                            validator: (rule, value, callback) => {
                                const {queryItems} = this.props.listPage;
                                let count = 0;

                                queryItems.value.forEach(item => {
                                    if (item.field === value) count += 1;
                                });

                                count === 2 ? callback('不可添加重复字段名！') : callback();
                            },
                        }
                    ],
                },
            },
        },
        {
            title: '中文名',
            dataIndex: 'label',
            key: 'label',
            width: '25%',
            props: {
                type: 'input',
                placeholder: '请输入中文名',
                decorator: {
                    rules: [
                        {required: true, message: '请输入中文名！'},
                    ],
                },
            },
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: '25%',
            props: {
                type: 'select',
                placeholder: '请选择类型',
                decorator: {
                    initialValue: 'input',
                    rules: [
                        {required: true, message: '请选择类型'},
                    ],
                },
                getValue: e => e,
                elementProps: {
                    options: [
                        {label: 'input(输入框)', value: 'input'},
                        {label: 'number(数字输入框)', value: 'number'},
                        {label: 'textarea(文本框)', value: 'textarea'},
                        {label: 'password(密码框)', value: 'password'},
                        {label: 'mobile(手机输入框)', value: 'mobile'},
                        {label: 'email(邮件输入框)', value: 'email'},
                        {label: 'select(下拉选择)', value: 'select'},
                        {label: 'select-tree(下拉树)', value: 'select-tree'},
                        {label: 'checkbox(多选框)', value: 'checkbox'},
                        {label: 'checkbox-group(多选框组)', value: 'checkbox-group'},
                        {label: 'radio(单选)', value: 'radio'},
                        {label: 'radio-group(单选组)', value: 'radio-group'},
                        {label: 'switch(切换按钮)', value: 'switch'},
                        {label: 'date(日期)', value: 'date'},
                        {label: 'date-time(日期-时间)', value: 'date-time'},
                        {label: 'date-range(日期区间)', value: 'date-range'},
                        {label: 'month(月份)', value: 'month'},
                        {label: 'time(时间)', value: 'time'},
                        {label: 'cascader(级联)', value: 'cascader'},
                    ],
                }
            },
        },
        {
            title: '操作',
            width: '25%',
            dataIndex: 'operator',
            render: (text, record) => {
                const {id, field, label} = record;
                const {form: {getFieldValue, setFieldsValue}} = this.props;
                const value = getFieldValue('queryItems');

                const deleteItem = {
                    label: '删除',
                    confirm: {
                        title: `您确定要删除"${label || field}"吗？`,
                        onConfirm: () => {
                            const newValue = value.filter(item => item.id !== id);
                            setFieldsValue({queryItems: newValue});
                        },
                    },
                };

                // 什么信息没填写，直接删除
                if (!field && !label) {
                    Reflect.deleteProperty(deleteItem, 'confirm');
                    deleteItem.onClick = () => {
                        const newValue = value.filter(item => item.id !== id);
                        setFieldsValue({queryItems: newValue});
                    };
                }

                const items = [
                    deleteItem,
                ];
                return <Operator items={items}/>;

            },
        },
    ];

    componentWillMount() {
        const {formRef, form, validate} = this.props;
        if (formRef) formRef(form);
        if (validate) validate(this.validate);

        this.props.action.generator.getSrcDirs();
    }

    componentWillReceiveProps(nextProps) {
        const {form: {setFieldsValue}} = this.props;
        const oldName = this.props.baseInfo.name.value;
        const name = nextProps.baseInfo.name.value;
        const capitalName = nextProps.baseInfo.capitalName.value;

        if (name !== oldName) {
            const ajaxUrl = `/api/${name}`;
            const routePath = `/${name}`;
            const outPutFile = `${name}/${capitalName}List.jsx`;

            setFieldsValue({
                ajaxUrl,
                routePath,
                outPutFile,
            });
        }
    }

    validate = () => {
        const {form} = this.props;

        return Promise.all([
            new Promise((resolve, reject) => {
                form.validateFieldsAndScroll((err, values) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(values)
                    }
                });
            }),
            new Promise((resolve, reject) => {
                this.fieldsTableForm.validateFieldsAndScroll((err, values) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(values);
                    }
                });
            }),
            new Promise((resolve, reject) => {
                this.queryItemsTableForm.validateFieldsAndScroll((err, values) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(values);
                    }
                });
            }),
        ]).then(([listPage]) => listPage);
    };

    render() {
        const {
            form: {getFieldDecorator, getFieldError},
            srcDirectories,
            onPreviewCode,
        } = this.props;
        const labelSpaceCount = 12;
        const span = 8;
        const tipWidth = 30;

        return (
            <Form>
                {getFieldDecorator('template')(<Input type="hidden"/>)}
                <Row>
                    <Col span={span}>
                        <FormItemLayout
                            label="生成文件目录/文件名"
                            labelSpaceCount={labelSpaceCount}
                            tip={<div style={{float: 'left', margin: '0 8px'}}>/</div>}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('outPutDir', {
                                rules: [
                                    {required: true, message: '请选择生成文件的目录',},
                                ],
                            })(
                                <TreeSelect
                                    style={{width: '100%'}}
                                    showSearch
                                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                    treeData={srcDirectories}
                                    placeholder="请选择生成文件的目录"
                                    treeDefaultExpandAll
                                    treeNodeLabelProp="shortValue"
                                />
                            )}
                        </FormItemLayout>
                    </Col>
                    <Col span={span}>
                        <FormItemLayout
                            labelWidth={0}
                            tip={(
                                <Tooltip
                                    placement="right"
                                    title="可以继续填写子目录，比如：user/UserList.jsx，将自动创建user目录"
                                >
                                    <Icon type="question-circle-o"/>
                                </Tooltip>
                            )}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('outPutFile', {
                                rules: [
                                    {required: true, message: '请输入生成的文件名',},
                                ],
                            })(
                                <Input placeholder="请输入生成的文件名"/>
                            )}
                        </FormItemLayout>
                    </Col>
                </Row>
                <Row>
                    <Col span={span}>
                        <FormItemLayout
                            label="ajax请求路径"
                            labelSpaceCount={labelSpaceCount}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('ajaxUrl', {
                                rules: [
                                    {required: true, message: '请输入ajax请求路径',},
                                ],
                            })(
                                <Input placeholder="请输入ajax请求路径"/>
                            )}
                        </FormItemLayout>
                    </Col>

                    <Col span={span}>
                        <FormItemLayout
                            label="页面路由地址"
                            labelSpaceCount={labelSpaceCount}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('routePath', {
                                rules: [
                                    {required: true, message: '请输入页面路由地址',},
                                ],
                            })(
                                <Input placeholder="请输入页面路由地址"/>
                            )}
                        </FormItemLayout>
                    </Col>
                </Row>
                {getFieldDecorator('fields')(
                    <EditableTable
                        formRef={form => this.fieldsTableForm = form}
                        hasError={getFieldError('fields')}
                        title={() => '表格字段：'}
                        columns={this.fieldsColumns}
                        newRecord={{id: uuid(), title: '', dataIndex: ''}}
                    />
                )}

                {getFieldDecorator('queryItems')(
                    <EditableTable
                        formRef={form => this.queryItemsTableForm = form}
                        hasError={getFieldError('queryItems')}
                        title={() => '查询条件：'}
                        columns={this.queryItemsColumns}
                        newRecord={{id: uuid(), field: '', label: '', type: 'input'}}
                    />
                )}
                <div style={{marginTop: '16px'}}>
                    <Button type="primary" onClick={onPreviewCode}>代码预览</Button>
                </div>
            </Form>
        );
    }
}
