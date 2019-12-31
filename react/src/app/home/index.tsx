import React, {FunctionComponent} from 'react';
import {Switch, Route} from 'react-router-dom';
import ReactRouter, {match} from 'react-router';
import HomeContainer from './containers/Home'
import withGenericHeader from "./withGenericHeader";

export default function Home({match: match}) {
    return (
        <Switch>
            <Route path={`${match.url}`} component={withGenericHeader} />
        </Switch>
    );
}
