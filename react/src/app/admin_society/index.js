import React from 'react';

import AdminSocietyDrawerMenu from "./components/AdminSocietyDrawerMenu";
import AdminSocietyRouter from './router.js'

import './styles/index.scss'

import AccountStore from '../../shared/stores/AccountStore'
import NotAuthorized from "../../shared/NotAuthorized/NotAuthorized";

import AdminLayout from '../../shared/AdminLayout/AdminLayout'

export default function AdminSociety({match}) {
    const siderMenu = [
        {
            key: 'dashboard',
            iconType: 'dashboard',
            title: '仪表盘'
        },
        {
            key: 'profile',
            iconType: 'project',
            title: '社团资料'
        },
        {
            key: 'page',
            iconType: 'layout',
            title: '社团主页'
        },
        {
            key: 'members',
            iconType: 'team',
            title: '社团成员'
        },
        {
            key: 'join_request',
            iconType: 'user-add',
            title: '加入请求'
        },
        {
            key: 'activity',
            iconType: 'form',
            title: '活动'
        }
    ];
    const breadcrumbNameMap = {
        '/admin_society': '主页',
        '/admin_society/profile': '社团信息',
        '/admin_society/members': '社员',
        '/admin_society/page': '社团主页',
        '/admin_society/activity': '活动',
        '/admin_society/join_request': '加入请求'
    };

    return (
        AccountStore.is_society  ?
            <AdminLayout
                drawMenuTitle="社团管理"
                baseUrl="/admin_society"
                siderMenu={siderMenu}
                breadcrumbNameMap={breadcrumbNameMap}
                footer={<h1>hello</h1>}
                router={<AdminSocietyRouter match={match}/>}
                drawMenu={<AdminSocietyDrawerMenu/>}
            />
            : <NotAuthorized/>
    );
}
