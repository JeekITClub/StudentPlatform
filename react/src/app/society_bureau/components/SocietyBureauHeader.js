import React from 'react';
import {Row, Col} from 'antd';

import LocationBreadcrumb from './LocationBreadcrumb';
import HeaderMenu from './HeaderMenu';
import '../styles/header.scss'


class SocietyBureauHeader extends React.Component {
    render() {
        return (
            <Row type="flex" className="society-bureau-header-container" align="middle" justify="space-between">
                <Col>
                    <LocationBreadcrumb/>
                </Col>
                <Col>
                    <HeaderMenu/>
                </Col>
            </Row>
        )
    }
}

export default SocietyBureauHeader;