import React, {Component} from 'react';
import {Form, Input, Row, Col, Icon, Tooltip} from 'antd';
import {FormItemLayout} from 'sx-antd';
import pluralize from 'pluralize';
import {connect} from '../models';
import {firstLowerCase, firstUpperCase, allUpperCase} from '../commons/utils';


@connect(state => ({baseInfo: state.baseInfo}))
@Form.create({
    mapPropsToFields: (props) => {
        const fields = {};

        Object.keys(props.baseInfo).forEach(key => {
            fields[key] = Form.createFormField({
                ...props.baseInfo[key],
                value: props.baseInfo[key].value,
            });
        });

        return fields;
    },
    onFieldsChange: (props, fields) => {
        props.action.baseInfo.setFields(fields);
    },
})
export default class BaseInfo extends Component {
    state = {};

    componentWillMount() {
        const {formRef, form} = this.props;
        if (formRef) formRef(form);
    }


    componentDidMount() {

    }

    handleChange = (e) => {
        e.preventDefault();

        const {form: {setFieldsValue}} = this.props;
        const name = e.target.value;

        const lowercaseName = firstLowerCase(name);
        const capitalName = firstUpperCase(name);
        const allCapitalName = allUpperCase(name);
        const pluralityName = pluralize(lowercaseName);

        setFieldsValue({
            lowercaseName,
            capitalName,
            allCapitalName,
            pluralityName,
            permissionPrefix: allCapitalName,
        });
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;
        const labelSpaceCount = 12;
        const span = 8;
        const tipWidth = 30;

        return (
            <Form>
                <Row>
                    <Col span={span}>
                        <FormItemLayout
                            label="模块英文名"
                            labelSpaceCount={labelSpaceCount}
                            tip={(
                                <Tooltip
                                    placement="right"
                                    title="以'-'分割，全英文小写命名，比如：user-center"
                                >
                                    <Icon type="question-circle-o"/>
                                </Tooltip>
                            )}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('name', {
                                rules: [
                                    {required: true, message: '请输入模块名',},
                                ],
                                onChange: this.handleChange,
                            })(
                                <Input placeholder="请输入模块名"/>
                            )}
                        </FormItemLayout>
                    </Col>

                    <Col span={span}>
                        <FormItemLayout
                            label="模块中文名"
                            labelSpaceCount={labelSpaceCount}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('chineseName', {
                                rules: [
                                    {required: true, message: '请输入中文名',},
                                ],
                            })(
                                <Input placeholder="请输入中文名"/>
                            )}
                        </FormItemLayout>
                    </Col>

                    <Col span={span}>
                        <FormItemLayout
                            label="全部大写命名"
                            labelSpaceCount={labelSpaceCount}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('allCapitalName', {
                                rules: [
                                    {required: true, message: '请输入全部大写命名',},
                                ],
                            })(
                                <Input placeholder="请输入全部大写命名"/>
                            )}
                        </FormItemLayout>
                    </Col>

                    <Col span={span}>
                        <FormItemLayout
                            label="首字母小写-驼峰命名"
                            labelSpaceCount={labelSpaceCount}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('lowercaseName', {
                                rules: [
                                    {required: true, message: '请输入驼峰命名',},
                                ],
                            })(
                                <Input placeholder="请输入驼峰命名"/>
                            )}
                        </FormItemLayout>
                    </Col>


                    <Col span={span}>
                        <FormItemLayout
                            label="复数命名"
                            labelSpaceCount={labelSpaceCount}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('pluralityName', {
                                rules: [
                                    {required: true, message: '请输入复数命名',},
                                ],
                            })(
                                <Input placeholder="请输入首字母大写试驼峰命名"/>
                            )}
                        </FormItemLayout>
                    </Col>

                    <Col span={span}>
                        <FormItemLayout
                            label="权限前缀"
                            labelSpaceCount={labelSpaceCount}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('permissionPrefix', {
                                rules: [
                                    {required: true, message: '请输入权限前缀',},
                                ],
                            })(
                                <Input placeholder="请输入权限前缀"/>
                            )}
                        </FormItemLayout>
                    </Col>

                    <Col span={span}>
                        <FormItemLayout
                            label="首字母大写-驼峰命名"
                            labelSpaceCount={labelSpaceCount}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('capitalName', {
                                rules: [
                                    {required: true, message: '请输入首字母大写试驼峰命名',},
                                ],
                            })(
                                <Input placeholder="请输入首字母大写试驼峰命名"/>
                            )}
                        </FormItemLayout>
                    </Col>

                </Row>
            </Form>
        );
    }
}
