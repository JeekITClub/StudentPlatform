import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';


class StudentLoginForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // perform ajax request
                console.log(values.userName);
                console.log(values.password);
                console.log(values.remember);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入你的学号，格式如: 2018xxxx'}],
                    })(
                        <Input size="large" prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="学号"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input size="large" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="密码"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住我</Checkbox>
                    )}
                    <Button size="large" type="primary" htmlType="submit" style={{width: '100%'}}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedStudentLoginForm = Form.create({name: 'student_login'})(StudentLoginForm);

export default WrappedStudentLoginForm;