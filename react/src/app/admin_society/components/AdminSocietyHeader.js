import React from 'react';
import {Menu, Row, Col, Icon} from 'antd';

import LocationBreadcrumb from '../../../shared/location_breadcrumb/LocationBreadcrumb';
import '../styles/header.scss'

const {SubMenu, Item, Divider} = Menu;
const breadcrumbNameMap = {
    '/admin_society': '主页',
    '/admin_society/profile': '个人信息',
    '/admin_society/member': '社员',
};

class AdminSocietyHeader extends React.Component {

    render() {
        return (
            <Row type="flex" className="admin-society-header-container" align="middle" justify="space-between">
                <Col>
                    <LocationBreadcrumb breadcrumbNameMap={breadcrumbNameMap}/>
                </Col>
                <Col>
                    <Menu mode="horizontal" className="admin-society-header-menu">
                        <Item key="123">
                            <Icon type="question-circle"/>帮助
                        </Item>
                        <SubMenu title="用户名">
                            <Item key="username">
                                个人信息
                            </Item>
                            <Divider/>
                            <Item key="logout">
                                注销
                            </Item>
                        </SubMenu>
                    </Menu>
                </Col>
            </Row>
        )
    }
}

export default AdminSocietyHeader;