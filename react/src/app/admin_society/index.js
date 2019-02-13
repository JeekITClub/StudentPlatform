import React from 'react';
import {Col, Row} from 'antd';

import AdminSocietySider from './components/AdminSocietySider.js';
import AdminSocietyHeader from './components/AdminSocietyHeader.js';
import AdminSocietyDrawerMenu from "./components/AdminSocietyDrawerMenu";
import AdminSocietyFooter from "./components/AdminSocietyFooter";
import NotAuthorized from "../../shared/NotAuthorized/NotAuthorized";
import AdminSiderBrand from "../../shared/AdminSiderBrand/AdminSiderBrand";
import AdminSocietyRouter from './router.js'

import './styles/index.scss'

import AccountStore from '../../shared/stores/AccountStore'

export default function AdminClub({match}) {
    return (
        AccountStore.is_society ?
            <div>
                <AdminSocietyDrawerMenu/>
                <Row className="admin-society-container">
                    <Col xs={0} sm={0} md={0} lg={4} xl={3} className="admin-society-sider-container">
                        <AdminSiderBrand/>
                        <AdminSocietySider/>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={20} xl={21} className="admin-society-main-wrapper">
                        <Row>
                            <AdminSocietyHeader/>
                        </Row>
                        <Row className="container-fluid mt-4">
                            <AdminSocietyRouter match={match}/>
                        </Row>
                    </Col>
                </Row>
                <AdminSocietyFooter/>
            </div>
            : <NotAuthorized/>
    );
}
