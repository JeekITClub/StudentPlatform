import React from 'react';
import {Layout, Row, Col} from "antd";

import SocietyBureauHeader from './components/SocietyBureauHeader';
import SocietyBureauSider from './components/SocietyBureauSider';
import SBDrawerMenu from "./components/SBDrawerMenu";
import SBRouter from './router'

import './styles/index.scss';

import AccountStore from '../../shared/stores/AccountStore';
import NotAuthorized from "../../shared/NotAuthorized/NotAuthorized";

import AdminLayout from '../../shared/AdminLayout/AdminLayout'

const {
    Footer
} = Layout;

export default function SocietyBureau({match}) {
    return (
        AccountStore.is_society_bureau ?
            
            : <NotAuthorized/>
    );
}
