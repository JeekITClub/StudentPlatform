import React from 'react';
import {Menu, Icon} from 'antd';
import {withRouter} from "react-router-dom";

import '../styles/sider.scss';
import PropTypes from "prop-types";

@withRouter
class AdminSocietySider extends React.Component {
    handleClick = (e) => {
        console.log('click ', e);
        this.props.history.push(e.key);
    };

    render() {
        return (
            <Menu theme="light" mode="inline" onClick={this.handleClick} className="admin-society-sider-menu">
                <Menu.Item key="1">
                    <Icon type="user"/>
                    <span className="nav-text">nav 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="video-camera"/>
                    <span className="nav-text">nav 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="upload"/>
                    <span className="nav-text">nav 3</span>
                </Menu.Item>
                <Menu.Item key="4">
                    <Icon type="bar-chart"/>
                    <span className="nav-text">nav 4</span>
                </Menu.Item>
                <Menu.Item key="5">
                    <Icon type="cloud-o"/>
                    <span className="nav-text">nav 5</span>
                </Menu.Item>
                <Menu.Item key="6">
                    <Icon type="appstore-o"/>
                    <span className="nav-text">nav 6</span>
                </Menu.Item>
                <Menu.Item key="7">
                    <Icon type="team"/>
                    <span className="nav-text">nav 7</span>
                </Menu.Item>
                <Menu.Item key="8">
                    <Icon type="shop"/>
                    <span className="nav-text">nav 8</span>
                </Menu.Item>
            </Menu>
        )
    }
}

AdminSocietySider.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default AdminSocietySider;