import React from 'react';
import {Layout, Row, Col} from 'antd';

import LocationBreadcrumb from './components/LocationBreadcrumb';
import HeaderMenu from './components/HeaderMenu';
import './styles/HeaderMenu.scss'

const {Header} = Layout;


class SocietyBureauHeader extends React.Component {
    render() {
        return (
            <Header className="society-bureau-header">
                <Row type="flex" className="society-bureau-header-container" align="middle" justify="space-between">
                    <Col>
                        <LocationBreadcrumb/>
                    </Col>
                        <HeaderMenu/>
                </Row>
            </Header>
        )
    }
}

export default SocietyBureauHeader;