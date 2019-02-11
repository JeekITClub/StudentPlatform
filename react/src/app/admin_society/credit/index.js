import React from 'react';
import {Switch, Route} from 'react-router-dom';
import CreditDistributionContainer from "./containers/CreditDistributionContainer";

export default function Credit({match}) {
    return (
        <Switch>
            <Route path={`${match.url}`} component={CreditDistributionContainer}/>
        </Switch>
    );
}
