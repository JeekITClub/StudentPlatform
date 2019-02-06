import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from "./container/Dashboard";

export default function SBRouter({match}) {
    return (
        <Switch>
            <Route path={`${match.url}/profile`} component={Dashboard}/>
            <Route path={`${match.url}`} exact component={Dashboard}/>
        </Switch>
    )
}