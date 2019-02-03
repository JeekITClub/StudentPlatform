import React from 'react';
import {Menu, Icon} from 'antd';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";


@withRouter
class SocietyBureauSider extends React.Component {
    state = {
        key: ['dashboard']
    };
    handleOnClick = (e) => {
        this.setState({key: [e.key]});
        this.props.history.push(e.key);
    };

    render() {
        return (
            <Menu
                multiple={false}
                onClick={this.handleOnClick}
                theme="dark"
                mode="vertical"
                defaultSelectedKeys={['dashboard']}
                selectedKeys={this.state.key}
            >
                <Menu.Item key="dashboard">
                    <Icon type="dashboard"/>
                    仪表盘
                </Menu.Item>
                <Menu.Item key="society">
                    <Icon type="reconciliation"/>
                    <span className="nav-text">社团</span>
                </Menu.Item>
                <Menu.Item key="student-user">
                    <Icon type="user"/>
                    <span className="nav-text">学生用户</span>
                </Menu.Item>
            </Menu>
        )
    }
}

SocietyBureauSider.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
};

export default SocietyBureauSider;