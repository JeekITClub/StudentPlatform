import React from 'react';

import SBRouter from './router'

import './styles/index.scss';

import AccountStore from '../../shared/stores/AccountStore';
import NotAuthorized from "../../shared/NotAuthorized/NotAuthorized";

import AdminLayout from '../../shared/AdminLayout/AdminLayout'

export default function SocietyBureau({ match }) {
    const siderMenu = [
        {
            key: 'dashboard',
            iconType: 'dashboard',
            title: '仪表盘'
        },
        {
            key: 'society',
            iconType: 'team',
            title: '社团管理'
        },
        {
            key: 'audit',
            iconType: 'edit',
            title: '社团审核'
        },
        {
            key: 'credit',
            iconType: 'star',
            title: '学分管理'
        }
    ];

    const breadcrumbNameMap = {
        '/manage': '主页',
        '/manage/society': '社团管理',
        '/manage/audit': '社团审核',
        '/manage/credit': '学分管理'
    };

    return (
        AccountStore.is_society_bureau ?
            <AdminLayout
                drawMenuTitle="社团部管理"
                baseUrl="/manage"
                siderMenu={siderMenu}
                breadcrumbNameMap={breadcrumbNameMap}
                footer={<h1>footer</h1>}
                router={<SBRouter match={match}/>}
            />
            : <NotAuthorized/>
    );
}
