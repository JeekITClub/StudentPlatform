import React from 'react';
import {Row, Col} from 'antd';

import WrappedLoginForm from '../components/LoginForm';
import GenericHeader from "../components/GenericHeader";

class Login extends React.Component {
    render() {
        return (
            <Row type="flex" justify="center">
                <Col xl={6} lg={12} md={20}>
                    <WrappedLoginForm/>
                </Col>
            </Row>
        )
    }
}

export default Login;