import React from 'react';
import {Route, Switch} from "react-router-dom";
import Loadable from "react-loadable";
import {Col, Row} from "antd";

import GenericHeader from "./components/GenericHeader";
import Login from "./containers/Login";
import WrappedChangePasswordForm from "../../shared/change_password/ChangePasswordForm";
import StudentPage from "./containers/StudentPage";

import {LoginRequiredRoute} from "../../shared/route";
import Loading from "../../shared/Loading";
import './styles/SocietyHome.scss';

const Society = Loadable({
    loader: () => import(/* webpackChunkName: "society" */'../society/index.js'),
    loading: Loading,
});

export default function withGenericHeader({match}) {
    return (
        <div className="society-home-container">
            <GenericHeader/>
            <Row className="mt-5" type="flex" justify="space-around">
                <Col xs={22} sm={22} md={20} lg={20} xl={20} xxl={18}>
                    <Switch>
                        <Route path={`${match.url}society`} component={Society}/>
                        <Route path={`${match.url}login`} component={Login}/>
                        <LoginRequiredRoute path={`${match.url}password`} component={WrappedChangePasswordForm}/>
                        <LoginRequiredRoute path={`${match.url}student`} component={StudentPage}/>
                    </Switch>
                </Col>
            </Row>
        </div>

    )
}