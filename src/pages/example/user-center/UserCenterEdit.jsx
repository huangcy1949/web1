import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import {FormItemLayout} from 'sx-antd';
import PageContent from '../../../layouts/page-content';
import {connect} from '../../../models';

export const PAGE_ROUTE = '/user-center/+edit/:id';

@connect(state => ({
    data: state.userCenter.data,
    fetchingData: state.userCenter.fetchingData,
}))
@Form.create()
export default class UserCenterEdit extends Component {
    state = {
        isAdd: true,
    };

    componentWillMount() {
        const {id} = this.props.match.params;

        if (id === ':id') {
            this.setState({isAdd: true});
        } else {
            this.setState({isAdd: false});
            this.props.action.userCenter.getById({params: {id}});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {isAdd} = this.state;
        const {form, action: {userCenter}, history, fetchingData} = this.props;

        if (fetchingData) return;

        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const submitAjax = isAdd ? userCenter.save : userCenter.update;
                const successTip = isAdd ? '添加成功' : '修改成功';

                submitAjax({params: values, successTip, onResolve: () => history.push('/user-center')});
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {form: {getFieldDecorator}, fetchingData, data} = this.props;
        const {isAdd} = this.state;
        const title = isAdd ? '添加用户中心' : '修改用户中心';

        const labelSpaceCount = 4;

        return (
            <PageContent>
                <h1 style={{textAlign: 'center'}}>{title}</h1>
                <Form onSubmit={this.handleSubmit}>
                    {!isAdd ? getFieldDecorator('id', {initialValue: data.id})(<Input type="hidden"/>) : null}

                    <FormItemLayout
                        label="姓名"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('name', {
                            initialValue: data.name,
                            rules: [
                                {required: true, message: '请输入姓名！'},
                            ],
                        })(
                            <Input placeholder="请输入姓名"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="登录名"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('loginName', {
                            initialValue: data.loginName,
                            rules: [
                                {required: true, message: '请输入登录名！'},
                            ],
                        })(
                            <Input placeholder="请输入登录名"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="邮箱"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('email', {
                            initialValue: data.email,
                            rules: [
                                {required: true, message: '请输入邮箱！'},
                            ],
                        })(
                            <Input placeholder="请输入邮箱"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="电话"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('mobile', {
                            initialValue: data.mobile,
                            rules: [
                                {required: true, message: '请输入电话！'},
                            ],
                        })(
                            <Input placeholder="请输入电话"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="性别"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('gender', {
                            initialValue: data.gender,
                            rules: [
                                {required: true, message: '请输入性别！'},
                            ],
                        })(
                            <Input placeholder="请输入性别"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="职位"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('position', {
                            initialValue: data.position,
                            rules: [
                                {required: true, message: '请输入职位！'},
                            ],
                        })(
                            <Input placeholder="请输入职位"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="备注"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('remark', {
                            initialValue: data.remark,
                            rules: [
                                {required: true, message: '请输入备注！'},
                            ],
                        })(
                            <Input placeholder="请输入备注"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        labelSpaceCount={labelSpaceCount}
                    >
                        <Button
                            style={{marginRight: 8}}
                            loading={fetchingData}
                            type="primary"
                            onClick={this.handleSubmit}
                        >
                            提交
                        </Button>
                        <Button
                            type="ghost"
                            onClick={this.handleReset}
                        >
                            重置
                        </Button>
                    </FormItemLayout>
                </Form>
            </PageContent>
        );
    }
}
