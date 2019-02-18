import React from 'react';
import {Route, Switch} from "react-router-dom";
import Loadable from "react-loadable";

import Login from "./containers/Login";
import {LoginRequiredRoute} from "../../shared/route";
import StudentPage from "./containers/StudentPage";
import WrappedChangePasswordForm from "../../shared/change_password/ChangePasswordForm";
import GenericHeader from "./components/GenericHeader";

import Loading from "../../shared/Loading";

const Society = Loadable({
    loader: () => import(/* webpackChunkName: "society" */'../society/index.js'),
    loading: Loading,
});

export default function withGenericHeader({match}) {
    return (
        <div>
            <GenericHeader/>
            <Switch>
                <Route path={`${match.url}society`} component={Society}/>
                <Route path={`${match.url}login`} component={Login}/>
                <LoginRequiredRoute path={`${match.url}password`} component={WrappedChangePasswordForm}/>
                <LoginRequiredRoute path={`${match.url}student`} component={StudentPage}/>
            </Switch>
        </div>

    )
}