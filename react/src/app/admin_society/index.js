import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {Layout, Col, Row} from 'antd';
import "antd/dist/antd.css";

import AdminSocietySider from './components/AdminSocietySider.js';
import AdminSocietyHeader from './components/AdminSocietyHeader.js';
import DrawerMenu from "../../shared/drawer_menu/DrawerMenu";
import Member from './members/index.js';
import './styles/index.scss'

const {
    Footer,
} = Layout;

export default function AdminClub({match}) {
    return (
        <div>
            <DrawerMenu>
                <Link to={'/'}><p>233</p></Link>
                <Link to={'/'}><p>233</p></Link>
                <Link to={'/'}><p>233</p></Link>
            </DrawerMenu>
            <Row className="admin-society-container">
                <Col xs={0} sm={0} md={0} lg={4} xl={3} className="admin-society-sider-container">
                    <h2>Logo</h2>
                    <AdminSocietySider/>
                </Col>
                <Col xs={24} sm={24} md={24} lg={20} xl={21} className="admin-society-main-wrapper">
                    <Row>
                        <AdminSocietyHeader/>
                    </Row>
                    <Row className="container-fluid mt-4">
                        <Switch>
                            <Route path={`${match.url}/member`} component={Member}/>
                        </Switch>
                    </Row>
                </Col>
            </Row>
            <Layout>
                <Footer>
                    <Row>
                        <h2>Logo</h2>
                    </Row>
                </Footer>
            </Layout>
        </div>
    );
}
