import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';

import './NotAuthorized.scss';

class NotAuthorized extends React.Component {
    render() {
        return (
            <Row type="flex" align="middle" justify="center" className="not-authorized-container">
                <Row>
                    <Col span={24}>
                        <p className="not-authorized-text">你可没有权限呢</p>
                    </Col>
                    <Col span={12}>
                        <h4 className="text-center">
                            <Link to={'/'}>回首页</Link>
                        </h4>
                    </Col>
                    <Col span={12}>
                        <h4 className="text-center">
                            <Link to={'/login'}>去登录</Link>
                        </h4>
                    </Col>
                </Row>
            </Row>
        )
    }
}

export default NotAuthorized;