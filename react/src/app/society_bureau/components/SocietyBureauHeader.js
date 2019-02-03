import React from 'react';
import {Row, Col} from 'antd';

import LocationBreadcrumb from '../../../shared/location_breadcrumb/LocationBreadcrumb';
import HeaderMenu from './HeaderMenu';
import '../styles/header.scss'

const breadcrumbNameMap = {
    '/manage': '主页',
    '/manage/profile': '个人信息',
};

class SocietyBureauHeader extends React.Component {
    render() {
        return (
            <Row type="flex" className="society-bureau-header-container" align="middle" justify="space-between">
                <Col>
                    <LocationBreadcrumb breadcrumbNameMap={breadcrumbNameMap}/>
                </Col>
                <Col>
                    <HeaderMenu/>
                </Col>
            </Row>
        )
    }
}

export default SocietyBureauHeader;