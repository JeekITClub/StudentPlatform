import React from 'react';
import {Switch, Route} from 'react-router-dom';

import HomeContainer from './containers/HomeContainer'
import withGenericHeader from "./withGenericHeader";

export default function Home({match}) {
    return (
        <Switch>
            <Route path={`${match.url}`} exact component={HomeContainer}/>
            <Route path={`${match.url}`} component={withGenericHeader} />
        </Switch>
    );
}
