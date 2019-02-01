import React from 'react';
import {Avatar, Popover, Menu, Icon, Row, Col} from 'antd';
import {withRouter, Link} from "react-router-dom";

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
        this.props.history.push(e.key);
    };

    logout = () => {
        console.log('Logout!');
    };

    render() {
        const text = <span>设置</span>;
        const content = (
            <div>
                <p>
                    <a onClick={this.logout}>修改密码</a>
                </p>
                <p style={{margin: '0'}}>
                    <a onClick={this.logout}>退出</a>
                </p>
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
        )
    }
}

export default withRouter(HeaderMenu);