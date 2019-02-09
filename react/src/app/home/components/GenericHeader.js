import React from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';

import AccountStore from '../../../shared/stores/AccountStore'

const {SubMenu} = Menu;

import '../styles/Header.scss'

class GenericHeader extends React.Component {
    renderLeftMenu = () => {
        return (
            <Menu mode="horizontal" className="generic-header-menu">
                <Menu.Item>
                    <Link to={'/'} className="generic-header-link">JPSP</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/'} className="generic-header-link">首页</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/society'} className="generic-header-link">社团</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/activity'} className="generic-header-link">活动</Link>
                </Menu.Item>
            </Menu>
        )
    };

    renderRightMenu = () => {
        if (AccountStore.authenticated) {
            return (
                <Menu mode="horizontal" className="generic-header-menu pull-right">
                    <SubMenu title="username">
                        <Menu.Item>
                            <Link to={'/profile'} className="generic-header-link">个人资料</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            )
        }

        return (
            <Menu mode="horizontal" className="generic-header-menu pull-right">
                <Menu.Item>
                    <Link to={'/login'} className="generic-header-link">登陆</Link>
                </Menu.Item>
            </Menu>
        )
    };

    render() {
        return (
            <div className="generic-header">
                {this.renderLeftMenu()}
                {this.renderRightMenu()}
            </div>
        )
    }
}

export default GenericHeader;