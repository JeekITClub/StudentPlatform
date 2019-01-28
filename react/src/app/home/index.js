import React from 'react';
import {Switch, Route} from 'react-router-dom';
import StudentLogin from './containers/StudentLogin';

export default function Home({match}) {
    return (
        <Switch>
            <Route path={`${match.url}login`} component={StudentLogin}/>
            <Route path={`${match.url}`} exact component={function () {
                return <h1>Index</h1>
            }}/>
        </Switch>
    );
}
