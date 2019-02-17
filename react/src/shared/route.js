import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import AccountStore from './stores/AccountStore'

const LoginRequiredRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            AccountStore.authenticated ? (
                <Component {...props} />
            ) : (
                <h1>快去登陆！</h1>
            )
        }
    />
);

export {LoginRequiredRoute};