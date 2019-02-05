import React from 'react';
import {Row, Col} from 'antd';

import WrappedLoginForm from '../components/LoginForm';

class Login extends React.Component {
    render() {
        return (
            <div>
                <Row type="flex" justify="center">
                    <Col xl={6} lg={12} md={20}>
                        <Row>
                            <Col>
                                <WrappedLoginForm/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Login;