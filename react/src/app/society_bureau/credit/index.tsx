import React from 'react';
import {Switch, Route, match} from 'react-router-dom'
import CreditDistributionList from './components/CreditDistributionList'

export default function Credit({ match: match }) {
    return (
        <Switch>
            <Route path={`${match.url}`} component={CreditDistributionList} />
        </Switch>
    )
}