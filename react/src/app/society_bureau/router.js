import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from "./container/Dashboard";
import SocietyListContainer from "./society/containers/SocietyListContainer";
import CreditContainer from "./credit/containers/CreditContainer";
import NotFound from "../../shared/NotFound/NotFound";

export default function SBRouter({ match }) {
    return (
        <Switch>
            <Route path={`${match.url}/credit`} component={CreditContainer}/>
            <Route path={`${match.url}/profile`} component={Dashboard}/>
            <Route path={`${match.url}/society`} component={SocietyListContainer}/>
            <Route path={`${match.url}`} exact component={Dashboard}/>
            <Route component={NotFound}/>
        </Switch>
    )
}