import React from 'react';
import {Avatar, Menu, Icon, Row, Col} from 'antd';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";

const SubMenu = Menu.SubMenu;

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        // TODO: extract username from store
        this.state = {
            username: 'QSM',
            current: '',
        };
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    handleClick = (e) => {
        if (e.key === 'logout') {
            this.logout()
        } else {
            this.props.history.push(e.key);
        }
    };

    logout = () => {
        console.log('Logout!');
    };

    render() {
        const avatar = (
            <div>
                <Avatar className="society-bureau-header-menu-avatar">
                    {this.state.username}
                </Avatar>
                <Icon type="down"/>
            </div>
        );

        return (
            <Row type="flex" align="middle" gutter={20}>
                <Col>
                    <Menu
                        selectedKeys={[this.state.current]}
                        onClick={this.handleClick}
                        mode="horizontal">
                        <Menu.Item key="/">首页</Menu.Item>
                        <Menu.Item key="/manage/help">帮助</Menu.Item>
                        <SubMenu title={avatar}>
                            <Menu.Item key="/manage/profile">个人信息</Menu.Item>
                            <Menu.Item key="logout">退出</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Col>
            </Row>
        )
    }
}

export default withRouter(HeaderMenu);