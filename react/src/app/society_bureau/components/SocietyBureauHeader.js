import React from 'react';
import {Layout, Row, Col, Breadcrumb} from 'antd';

import '../styles/header.scss'

const {Header} = Layout;


class SocietyBureauHeader extends React.Component {
    renderBreadcrumb = () => {
        return null
    };

    render() {
        return (
                <Header className="society-bureau-header">
                    <Row type="flex" className="society-bureau-header-container" align="middle">
                        <Col>
                            <Breadcrumb>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
                                <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
                                <Breadcrumb.Item>An Application</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </Header>

        )
    }
}

export default SocietyBureauHeader;