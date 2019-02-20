import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';


class NotFound extends React.Component {
    render() {
        return (
            <Row type="flex" align="middle" justify="center" className="mt-5">
                <Col className="text-center">
                    <h1>404 Not Found</h1>
                    <h4>😲 你要查看的内容不见了 😲</h4>
                    <h4><Link to={'/'}>回首页</Link></h4>
                </Col>
            </Row>
        )
    }
}

export default NotFound;