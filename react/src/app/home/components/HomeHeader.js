import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';

import '../styles/Header.scss'

class HomeHeader extends React.Component {
    render() {
        return (
            <Row className="home-header" type="flex" justify="space-between">
                <Col offset={3}>
                    <Link className="home-header-brand" to={'/'}>JPSP</Link>
                </Col>
                <Col span={6}>
                    <Row type="flex" justify="space-around" className="center">
                        <Col className="align-self-center position-relative">
                            <Link to={'/society'} className="home-header-link">社团</Link>
                        </Col>
                        <Col className="align-self-center position-relative">
                            <Link to={'/activity'} className="home-header-link">活动</Link>
                        </Col>
                        <Col className="align-self-center position-relative">
                            <Link to={'/help'} className="home-header-link">帮助</Link>
                        </Col>
                    </Row>
                </Col>
                <Col className="position-relative" pull={2}>
                    <Link to={'/login'} className="home-header-link">登陆</Link>
                </Col>
            </Row>
        )
    }
}

export default HomeHeader;