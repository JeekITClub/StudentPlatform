import React from 'react';
import '../styles/header.scss'
import {Layout, Menu} from 'antd';

const {Header} = Layout;
const {SubMenu, Item, Divider} = Menu;

class AdminSocietyHeader extends React.Component {
    renderBreadcrumb = () => {
        return null
    };

    render() {
        return (
            <Header className="admin-society-header">
                {this.renderBreadcrumb()}
                <Menu mode="horizontal" className="admin-society-header-menu">
                    <Item key="123">
                        一个菜单选项
                    </Item>
                    <SubMenu title="用户名">
                        <Item key="username">
                            用户名
                        </Item>
                        <Divider/>
                        <Item key="logout">
                            注销
                        </Item>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}

export default AdminSocietyHeader;