import React from 'react';
import {Layout, Row, Col} from "antd";

import SocietyBureauHeader from './components/SocietyBureauHeader';
import SocietyBureauSider from './components/SocietyBureauSider';
import SBDrawerMenu from "./components/SBDrawerMenu";
import SBRouter from './router'

import './styles/index.scss';

import AccountStore from '../../shared/stores/AccountStore';
import NotAuthorized from "../../shared/NotAuthorized/NotAuthorized";

const {
    Footer
} = Layout;

export default function SocietyBureau({match}) {
    return (
        AccountStore.is_society_bureau ?
            <div>
                <SBDrawerMenu/>
                <Row className="society-bureau-container">
                    <Col xs={0} sm={0} md={0} lg={4} xl={3} className="society-bureau-sider-container">
                        <SocietyBureauSider/>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={20} xl={21} className="society-bureau-main-wrapper">
                        <Row>
                            <SocietyBureauHeader/>
                        </Row>
                        <Row className="container-fluid mt-4">
                            <SBRouter match={match}/>
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
            : <NotAuthorized/>
    );
}
