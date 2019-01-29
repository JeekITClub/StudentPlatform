import React from 'react';
import {
    Form, Icon, Input, Button,
} from 'antd';


class ChangePasswordForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // perform ajax request
                console.log(values.oldPassword);
                console.log(values.newPassword);
                console.log(values.confirmPassword);
            }
        });
    };

    validateNewPassword = (rule, value, callback) => {
        const {getFieldValue} = this.props.form;
        if (value && value === getFieldValue('oldPassword')) {
            callback('新密码不能与原密码相同！')
        }

        callback()
    };

    validateConfirmPassword = (rule, value, callback) => {
        const {getFieldValue} = this.props.form;
        if (value && value !== getFieldValue('newPassword')) {
            callback('两次输入不一致！')
        }

        callback()
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('oldPassword', {
                        rules: [{required: true, message: '请输入原密码!'}],
                    })(
                        <Input size="large" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type="password"
                               placeholder="原密码"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('newPassword', {
                        rules: [{
                            required: true, message: '请输入新密码!'
                        }, {
                            validator: this.validateNewPassword
                        }],
                    })(
                        <Input size="large" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type="password"
                               placeholder="新密码"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('confirmPassword', {
                        rules: [{
                            required: true, message: '请输入新密码!'
                        }, {
                            validator: this.validateConfirmPassword
                        }],
                    })(
                        <Input size="large" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type="password"
                               placeholder="再次输入新密码"/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button size="large" type="primary" htmlType="submit" style={{width: '100%'}}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedChangePasswordForm = Form.create({name: 'change_password'})(ChangePasswordForm);

export default WrappedChangePasswordForm;