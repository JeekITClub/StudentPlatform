import React from 'react';
import {Menu, Icon} from 'antd';
import {withRouter} from "react-router-dom";

import '../styles/sider.scss';
import PropTypes from "prop-types";

@withRouter
class AdminSocietySider extends React.Component {
    handleClick = (e) => {
        console.log('click ', e);
        this.props.history.push(`/admin_society/${e.key}/`);
    };

    render() {
        return (
            <Menu theme="light" mode="inline" onClick={this.handleClick} className="admin-society-sider-menu">
                <Menu.Item key="dashboard">
                    <Icon type="dashboard"/>
                    <span className="nav-text">仪表盘</span>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Icon type="project"/>
                    <span className="nav-text">社团资料</span>
                </Menu.Item>
                <Menu.Item key="page">
                    <Icon type="layout"/>
                    <span className="nav-text">社团首页自定义</span>
                </Menu.Item>
                <Menu.Item key="members">
                    <Icon type="team"/>
                    <span className="nav-text">社团成员</span>
                </Menu.Item>
                <Menu.Item key="join_request">
                    <Icon type="user-add"/>
                    <span className="nav-text">加入请求</span>
                </Menu.Item>
                <Menu.Item key="activity">
                    <Icon type="form"/>
                    <span className="nav-text">活动</span>
                </Menu.Item>
            </Menu>
        )
    }
}

AdminSocietySider.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
};

export default AdminSocietySider;