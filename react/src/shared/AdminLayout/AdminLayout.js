import React from 'react';
import * as PropTypes from 'prop-types'
import {Col, Row, Menu, Icon} from 'antd';
import {withRouter} from "react-router-dom";

import LocationBreadcrumb from '../LocationBreadcrumb/LocationBreadcrumb'

import './AdminLayout.scss'
import AccountStore from "../stores/AccountStore";

@withRouter
class AdminLayout extends React.Component {
    handleSiderMenuClick = (e) => {
        this.props.history.push(`${this.props.baseUrl}/${e.key}/`);
    };

    render() {
        return (
            <div>
                {this.props.drawMenu}
                <Row className="admin-layout-top">
                    <Col xs={0} sm={0} md={0} lg={4} xl={3} className="admin-layout-sider">
                        <h2 className="admin-layout-brand">JPSP</h2>
                        <Menu mode="inline" theme="dark" onClick={this.handleSiderMenuClick}>
                            {this.props.siderMenu.map((item) => {
                                return (
                                    <Menu.Item key={item.key}><Icon type={item.iconType}/>{item.title}</Menu.Item>
                                )
                            })}
                        </Menu>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={20} xl={21} className="admin-layout-main">
                        <Row className="admin-layout-header" type="flex" justify="space-between">
                            <Col xs={0} sm={0} md={4} className="admin-layout-breadcrumb">
                                <LocationBreadcrumb breadcrumbNameMap={this.props.breadcrumbNameMap}/>
                            </Col>
                            <Col>
                                <Menu mode="horizontal">
                                    <Menu.SubMenu title={AccountStore.user.username}>
                                        <Menu.Item>
                                            注销
                                        </Menu.Item>
                                    </Menu.SubMenu>
                                </Menu>
                            </Col>
                        </Row>
                        <Row className="admin-layout-content">
                            {this.props.router}
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.footer}
                    </Col>
                </Row>
            </div>
        )
    }
}

AdminLayout.propTypes = {
    baseUrl: PropTypes.string.isRequired,
    siderMenu: PropTypes.array.isRequired,
    breadcrumbNameMap: PropTypes.object.isRequired,
    footer: PropTypes.node.isRequired,
    router: PropTypes.node.isRequired,
    drawMenu: PropTypes.node.isRequired
};

export default AdminLayout;