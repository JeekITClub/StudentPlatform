import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Layout, Row, Col, Affix, Button, Drawer} from "antd";
import "antd/dist/antd.css";

import SocietyBureauHeader from './components/SocietyBureauHeader/index';
import SocietyBureauSider from './components/SocietyBureauSider';
import Dashboard from './pages/Dashboard';
import DrawerMenu from './components/DrawerMenu';
import './styles/index.scss';

const {
    Sider,
    Content,
    Header,
    Footer
} = Layout;

export default function SocietyBureau({match}) {
    return (
        <div>
            <DrawerMenu/>
            <Row className="society-bureau-container">
                <SocietyBureauSider/>
                <Col xs={24} sm={24} md={20} lg={21} xl={21} className="main-wrapper">
                    <Row>
                        <SocietyBureauHeader/>
                    </Row>
                    <Row className="container mt-4">
                        <Switch>
                            <Route path={`${match.url}/profile`} component={Dashboard}/>
                            <Route path={`${match.url}`} exact component={Dashboard}/>
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
