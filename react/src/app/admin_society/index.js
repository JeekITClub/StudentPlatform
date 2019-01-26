import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Layout} from 'antd';
import Member from './members/index.js';
import AdminSocietySider from './components/AdminSocietySider.js';
import "antd/dist/antd.css";

const {
    Header, Content
} = Layout;

export default function AdminClub({match}) {
    return (
        <Layout>
            <AdminSocietySider/>
            <Layout>
                <Header style={{background: '#fff', padding: 0}}/>
                <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    <Switch>
                        <Route path={`${match.url}/member`} component={Member}/>
                    </Switch>
                </Content>
            </Layout>
        </Layout>

    );
}
