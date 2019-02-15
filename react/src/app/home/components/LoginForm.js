import React from 'react';
import {Form, Icon, Input, Button, notification} from 'antd';
import Provider from '../../../utils/provider';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import AccountStore from '../../../shared/stores/AccountStore';

@withRouter
class LoginForm extends React.Component {

    redirectWithUserType = () => {
        if (AccountStore.is_student) {
            this.props.history.push('/')
        } else if (AccountStore.is_society) {
            this.props.history.push('/admin_society')
        } else if (AccountStore.is_society_bureau) {
            this.props.history.push('/manage')
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Provider.post('/api/account/login/', {
                    username: values.username,
                    password: values.password
                }).then((res) => {
                    if (res.status === 200) {
                        AccountStore.fetch();
                        this.redirectWithUserType()
                    }
                }).catch((err) => {
                    notification.error({
                        message: '登录失败',
                        description: '用户名或密码错误'
                    });
                    console.log(err)
                })
            }
        });
    };

    componentDidMount() {
        if (AccountStore.authenticated) {
            this.redirectWithUserType()
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名'}],
                    })(
                        <Input size="large" prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="学号（形如20150xxx，非班级学号）"/>
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