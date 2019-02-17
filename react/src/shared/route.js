import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import AccountStore from './stores/AccountStore';
import NotAuthorized from './NotAuthorized/NotAuthorized';

const LoginRequiredRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            if (!AccountStore.authenticated ||
                (props.match.path === '/admin_society' && !AccountStore.is_society) ||
                (props.match.path === '/manage' && !AccountStore.is_society_bureau)
            ) return <NotAuthorized/>;
            return <Component {...props} />
        }
        }
    />
);

export {LoginRequiredRoute};