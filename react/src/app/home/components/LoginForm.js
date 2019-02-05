import React from 'react';
import {
    Form, Icon, Input, Button,
    // Checkbox,
} from 'antd';
import Provider from '../../../utils/provider';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";

@withRouter
class LoginForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Provider.post('/api/account/login/', {
                    username: values.username,
                    password: values.password
                }).then((res) => {
                    if (res.status === 200) {
                        console.log('success');
                        // todo: add next to
                        this.props.history.push('/')
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名'}],
                    })(
                        <Input size="large" prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="学号"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码'}],
                    })(
                        <Input size="large" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type="password"
                               placeholder="密码"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {/*{getFieldDecorator('remember', {*/}
                    {/*valuePropName: 'checked',*/}
                    {/*initialValue: true,*/}
                    {/*})(*/}
                    {/*<Checkbox>记住我</Checkbox>*/}
                    {/*)}*/}
                    <Button size="large" type="primary" htmlType="submit" style={{width: '100%'}}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

LoginForm.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
};

const WrappedLoginForm = Form.create({name: 'student_login'})(LoginForm);

export default WrappedLoginForm;