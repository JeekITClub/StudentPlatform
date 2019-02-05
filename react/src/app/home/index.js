import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './containers/Login';
import WrappedChangePasswordForm from '../../shared/change_password/ChangePasswordForm';
import HomeContainer from './containers/HomeContainer'

export default function Home({match}) {
    return (
        <Switch>
            <Route path={`${match.url}login`} component={Login}/>
            <Route path={`${match.url}`} exact component={HomeContainer}/>
        </Switch>
    );
}
