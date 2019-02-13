import React from 'react';
import {Menu, Icon} from 'antd';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";


@withRouter
class SocietyBureauSider extends React.Component {
    handleClick = (e) => {
        console.log('click ', e);
        this.props.history.push(e.key);
    };

    render() {
        return (
            <Menu mode="inline" onClick={this.handleClick}>
                <Menu.Item key="/manage">
                    <Icon type="dashboard"/>
                    <span>Dashboard</span>
                </Menu.Item>
                <Menu.Item key="/manage/society">
                    <Icon type="team"/>
                    <span>社团管理</span>
                </Menu.Item>
                <Menu.Item key="/manage/audit">
                    <Icon type="edit"/>
                    <span>社团审核</span>
                </Menu.Item>
                <Menu.Item key="/manage/credit">
                    <Icon type="star"/>
                    <span>学分管理</span>
                </Menu.Item>
                <Menu.Item key="/manage/message">
                    <Icon type="mail"/>
                    <span>收件箱</span>
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
