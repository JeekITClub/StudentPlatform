import React from 'react';
import {Switch, Route} from 'react-router-dom'

import CreditSetList from './components/CreditSetList'
import CreditDistributionList from './components/CreditDistributionList'

export default function Credit({ match }) {
    return (
        <Switch>
            <Route path={`${match.url}/set`} component={CreditSetList} />
            <Route path={`${match.url}/check`} component={CreditDistributionList} />
        </Switch>
    )
}