import React from 'react';
import * as PropTypes from 'prop-types'
import {Col, Row} from 'antd';

import './AdminLayout.scss'

class AdminLayout extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={0} sm={0} md={0} lg={4} xl={3} className="admin-layout-sider">
                    <h2>Logo</h2>
                    {this.props.siderMenu}
                </Col>
                <Col xs={24} sm={24} md={24} lg={20} xl={21} className="admin-layout-main">
                    <Row className="admin-layout-header">
                        {this.props.header}
                    </Row>
                    <Row className="admin-layout-content">
                        {this.props.router}
                    </Row>
                </Col>
            </Row>
        )
    }
}

AdminLayout.propTypes = {
    siderMenu: PropTypes.node,
    header: PropTypes.node,
    footer: PropTypes.node,
    router: PropTypes.node
};

export default AdminLayout;