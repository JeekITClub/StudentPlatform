import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {Layout, Row, Col} from "antd";
import "antd/dist/antd.css";

import SocietyBureauHeader from './components/SocietyBureauHeader';
import SocietyBureauSider from './components/SocietyBureauSider';
import Dashboard from './pages/Dashboard';
import DrawerMenu from '../../shared/drawer_menu/DrawerMenu';
import './styles/index.scss';

const {
    Footer
} = Layout;

export default function SocietyBureau({match}) {
    return (
        <div>
            <DrawerMenu>
                <Link to={'/'}><p>233</p></Link>
                <Link to={'/'}><p>233</p></Link>
                <Link to={'/'}><p>233</p></Link>
            </DrawerMenu>
            <Row className="society-bureau-container">
                <Col xs={0} sm={0} md={0} lg={4} xl={3} className="society-bureau-sider-container">
                    <SocietyBureauSider/>
                </Col>
                <Col xs={24} sm={24} md={24} lg={20} xl={21} className="society-bureau-main-wrapper">
                    <Row>
                        <SocietyBureauHeader/>
                    </Row>
                    <Row className="container-fluid mt-4">
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
