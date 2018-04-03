import React, {Component} from 'react';
import {Form, Input, Row, Col, TreeSelect, Tooltip, Icon} from 'antd';
import {FormItemLayout} from 'sx-antd';
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

    componentWillMount() {
        const {formRef, form} = this.props;
        if (formRef) formRef(form);

        this.props.action.generator.getSrcDirs();
    }

    componentDidMount() {

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

    render() {
        const {form: {getFieldDecorator}, srcDirectories} = this.props;
        const labelSpaceCount = 12;
        const span = 8;
        const tipWidth = 30;

        return (
            <Form>
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
            </Form>
        );
    }
}
