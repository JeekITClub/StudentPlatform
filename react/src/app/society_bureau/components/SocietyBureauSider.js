import React from 'react';
import {Menu, Icon} from 'antd';
import {withRouter} from "react-router-dom";


class SocietyBureauSider extends React.Component {
    handleClick = (e) => {
        console.log('click ', e);
        this.props.history.push(e.key);
    };

    render() {
        return (
            <Menu theme="dark" mode="inline" onClick={this.handleClick}>
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

export default withRouter(SocietyBureauSider);