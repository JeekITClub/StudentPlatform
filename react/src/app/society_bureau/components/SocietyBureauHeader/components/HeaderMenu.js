import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Popover, Menu, Icon, Row, Col} from 'antd';


const text = <span>设置</span>;
const content = (
    <div>
        <p>
            <Link to={'/manage/profile'}>个人信息</Link>
        </p>
        <p>
            <Link to={'/manage/profile'}>退出</Link>
        </p>
    </div>
);

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        // TODO: extract username from store
        this.state = {
            username: 'QSM',
            current: '',
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
                <Row type="flex" align="middle" gutter={20}>
                    <Col>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                        >
                            <Menu.Item key="mail">
                                <Icon type="mail"/>首页
                            </Menu.Item>
                            <Menu.Item key="app">
                                <Icon type="appstore"/>帮助
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col>
                        <Popover placement="bottomRight" title={text} content={content} trigger="hover">
                            <div>
                                <Link to={'/manage/profile'}>
                                    <Avatar className="header-menu-avatar">
                                        {this.state.username}
                                    </Avatar>
                                </Link>
                                <Icon type="down"/>
                            </div>
                        </Popover>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default HeaderMenu;