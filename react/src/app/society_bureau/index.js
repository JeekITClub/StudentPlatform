import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Layout, Row} from "antd";
import "antd/dist/antd.css";

import SocietyBureauHeader from './components/SocietyBureauHeader';
import SocietyBureauSider from './components/SocietyBureauSider';

const {
    Sider,
    Content,
    Header,
    Footer
} = Layout;

export default function SocietyBureau({match}) {
    return (
        <Layout>
            <Layout style={{height: '100vh'}}>
                <SocietyBureauSider/>
                <Layout>
                    <SocietyBureauHeader/>
                    <Content>
                        <Switch>
                            <Route path={`${match.url}`} exact component={() => {
                                return <h1>SocietyBureau</h1>
                            }}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
            <Footer>
                <Row>
                    <h2>Logo</h2>
                </Row>
            </Footer>
        </Layout>
    );
}
