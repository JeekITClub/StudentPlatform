import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';


class NotFound extends React.Component {
    render() {
        return (
            <Row type="flex" align="middle" justify="center">
                <Col>
                    <h2>你来到了未知地带...</h2>
                </Col>
            </Row>
        )
    }
}

export default NotFound;