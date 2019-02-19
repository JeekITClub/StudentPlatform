import React from 'react';
import {Route} from 'react-router-dom';
import {observer} from 'mobx-react'

import NotLogin from './NotLogin/NotLogin';
import AccountStore from './stores/AccountStore';
import Loading from '../shared/Loading/index.js'

@observer
class LoginRequiredRoute extends React.Component {
    render() {
        const { Component, ...rest } = this.props;
        return (
            AccountStore.loading ?
                <Loading/>
                : <Route
                    {...rest}
                    render={props =>
                        AccountStore.authenticated ? (
                            <Component {...props} />
                        ) : (
                            <NotLogin/>
                        )
                    }
                />
        )
    }
}

export {LoginRequiredRoute};