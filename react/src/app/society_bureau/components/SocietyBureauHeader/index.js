import React from 'react';
import {Layout, Row, Col} from 'antd';

import LocationBreadcrumb from './components/LocationBreadcrumb';
import HeaderMenu from './components/HeaderMenu';
import './styles/header.scss'


class SocietyBureauHeader extends React.Component {
    render() {
        return (
            <Row type="flex" className="header-container" align="middle" justify="space-between">
                <Col>
                    <LocationBreadcrumb/>
                </Col>
                <HeaderMenu/>
            </Row>
        )
    }
}

export default SocietyBureauHeader;