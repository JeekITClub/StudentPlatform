import React from 'react';
import {Row, Col} from 'antd';
import LoginForm from './components/LoginForm';

const login: React.FunctionComponent = () => {
    return (
        <Row type="flex">
            <Col xl={12} lg={12}></Col>
            <Col xl={12} lg={12} md={20}>
                <LoginForm />
            </Col>
        </Row>
    )
}

export default login;