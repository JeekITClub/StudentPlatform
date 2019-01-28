import React from 'react';
import {Switch, Route} from 'react-router-dom';
import StudentLogin from './containers/StudentLogin';
import WrappedChangePasswordForm from '../../shared/change_password/ChangePasswordForm';

export default function Home({match}) {
    return (
        <Switch>
            <Route path={`${match.url}login`} component={StudentLogin}/>
            <Route path={`${match.url}`} exact component={function () {
                return <WrappedChangePasswordForm/>;
            }}/>
        </Switch>
    );
}
