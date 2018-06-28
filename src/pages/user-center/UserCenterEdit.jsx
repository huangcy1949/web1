import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import {FormItemLayout} from 'sx-antd';
import PageContent from '../../layouts/page-content';
import {ajaxHoc} from '../../commons/ajax';

export const PAGE_ROUTE = '/user-center/+edit/:id';

@ajaxHoc()
@Form.create()
export default class UserCenterEdit extends Component {
    state = {
        loading: false,
        data: {},
        isAdd: true,
    };

    componentWillMount() {
        const {id} = this.props.match.params;

        if (id === ':id') {
            this.setState({isAdd: true});
        } else {
            this.setState({isAdd: false, loading: true});
            this.props.ajax
                .get(`/user-center/${id}`)
                .then(res => {
                    if (res) {
                        this.setState({data: res});
                    }
                })
                .finally(() => this.setState({loading: false}));
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {isAdd, loading} = this.state;
        const {form, history} = this.props;

        if (loading) return;

        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const submitAjax = isAdd ? this.props.ajax.post : this.props.ajax.put;
                const successTip = isAdd ? '添加成功' : '修改成功';

                this.setState({loading: true});
                submitAjax('/user-center', values, {successTip})
                    .then(() => history.push('/user-center'));
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {isAdd, loading, data} = this.state;
        const title = isAdd ? '添加用户' : '修改用户';

        const labelSpaceCount = 4;

        return (
            <PageContent>
                <h1 style={{textAlign: 'center'}}>{title}</h1>
                <Form onSubmit={this.handleSubmit}>
                    {!isAdd ? getFieldDecorator('id', {initialValue: data.id})(<Input type="hidden"/>) : null}

                    <FormItemLayout
                        label="年龄"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('age', {
                            initialValue: data.age,
                            rules: [
                                {required: true, message: '请输入年龄！'},
                            ],
                        })(
                            <Input placeholder="请输入年龄"/>
                        )}
                    </FormItemLayout>

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
                        label="类型"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('fileType', {
                            initialValue: data.fileType,
                            rules: [
                                {required: true, message: '请输入类型！'},
                            ],
                        })(
                            <Input placeholder="请输入类型"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="名称"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('fieldName', {
                            initialValue: data.fieldName,
                            rules: [
                                {required: true, message: '请输入名称！'},
                            ],
                        })(
                            <Input placeholder="请输入名称"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="描述"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('fieldDes', {
                            initialValue: data.fieldDes,
                            rules: [
                                {required: true, message: '请输入描述！'},
                            ],
                        })(
                            <Input placeholder="请输入描述"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="路径"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('filePath', {
                            initialValue: data.filePath,
                            rules: [
                                {required: true, message: '请输入路径！'},
                            ],
                        })(
                            <Input placeholder="请输入路径"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="创建时间"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('createdDate', {
                            initialValue: data.createdDate,
                            rules: [
                                {required: true, message: '请输入创建时间！'},
                            ],
                        })(
                            <Input placeholder="请输入创建时间"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="版本"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('version', {
                            initialValue: data.version,
                            rules: [
                                {required: true, message: '请输入版本！'},
                            ],
                        })(
                            <Input placeholder="请输入版本"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        labelSpaceCount={labelSpaceCount}
                    >
                        <Button
                            style={{marginRight: 8}}
                            loading={loading}
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
