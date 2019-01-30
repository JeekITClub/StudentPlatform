import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Dropdown, Menu, Icon, Row, Col} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const userMenu = (
    <Menu>
        <Menu.Item>
            <Link to={'/manage/profile'}>设置</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to={'#'} >退出</Link>
        </Menu.Item>
    </Menu>
);

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        // TODO: extract username from store
        this.state = {
            username: 'QSM',
            current: 'mail',
        };
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Col>
                <Row type="flex" gutter={32}>
                    <Col>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                        >
                            <Menu.Item key="mail">
                                <Icon type="mail"/>Navigation One
                            </Menu.Item>
                            <Menu.Item key="app" disabled>
                                <Icon type="appstore"/>Navigation Two
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col>
                        <Dropdown overlay={userMenu}>
                            <div>
                                <Link to={'/manage/profile'}>
                                    <Avatar className="header-menu-avatar" size="large">
                                        {this.state.username}
                                    </Avatar>
                                </Link>
                                <Icon type="down"/>
                            </div>
                        </Dropdown>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default HeaderMenu;