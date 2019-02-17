import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';

import './NotLogin.scss';

class NotLogin extends React.Component {
    render() {
        return (
            <Row type="flex" align="middle" justify="center" className="not-login-container">
                <Row>
                    <Col span={24}>
                        <p className="not-login-text">你还没有登录</p>
                    </Col>
                    <Col span={12}>
                        <h4 className="text-center">
                            <Link to={'/'}>回首页</Link>
                        </h4>
                    </Col>
                    <Col span={12}>
                        <h4 className="text-center">
                            <Link to={'/login'}>
                                去登录
                            </Link>
                        </h4>
                    </Col>
                </Row>
            </Row>
        )
    }
}

export default NotLogin;