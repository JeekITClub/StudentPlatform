import React from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';

import AccountStore from '../../../shared/stores/AccountStore'

const {SubMenu} = Menu;

import '../styles/GenericHeader.scss'

class GenericHeader extends React.Component {
    componentDidMount() {
        AccountStore.fetch();
    }

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
                    {
                        AccountStore.is_student && (
                            <SubMenu title={AccountStore.user.username}>
                                <Menu.Item>
                                    <Link to={'/profile'}>个人资料</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to={'/change_password'}>修改密码</Link>
                                </Menu.Item>
                                <Menu.Divider/>
                                <Menu.Item>
                                    <Link to={'/logout'}>注销</Link>
                                </Menu.Item>
                            </SubMenu>
                        )
                    }
                    {
                        AccountStore.is_society && (
                            <SubMenu title={AccountStore.user.username}>
                                <Menu.Item>
                                    <Link to={'/admin_society/'}>社团管理</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to={'/admin_society/profile'}>社团资料</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to={'/admin_society/change_password'}>修改密码</Link>
                                </Menu.Item>
                                <Menu.Divider/>
                                <Menu.Item>
                                    <Link to={'/logout'}>注销</Link>
                                </Menu.Item>
                            </SubMenu>
                        )
                    }
                    {
                        AccountStore.is_society_bureau && (
                            <SubMenu title="社团部">
                                <Menu.Item>
                                    <Link to={'/'}>社团部管理</Link>
                                </Menu.Item>
                                <Menu.Divider/>
                                <Menu.Item>
                                    <Link to={'/logout'}>注销</Link>
                                </Menu.Item>
                            </SubMenu>
                        )
                    }
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