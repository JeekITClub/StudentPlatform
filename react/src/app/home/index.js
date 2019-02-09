import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './containers/Login';
import HomeContainer from './containers/HomeContainer'
import WrappedStudentProfile from "./components/StudentProfile";

import {LoginRequiredRoute} from '../../shared/route'

export default function Home({match}) {
    return (
        <Switch>
            <Route path={`${match.url}login`} component={Login}/>
            <LoginRequiredRoute path={`${match.url}profile`} component={WrappedStudentProfile}/>
            <Route path={`${match.url}`} exact component={HomeContainer}/>
        </Switch>
    );
}
