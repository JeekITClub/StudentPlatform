import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import NotLogin from './NotLogin/NotLogin';
import AccountStore from './stores/AccountStore';

const LoginRequiredRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            AccountStore.authenticated ? (
                <Component {...props} />
            ) : (
                <NotLogin/>
            )
        }
    />
);

export {LoginRequiredRoute};