import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Col, Row} from "antd";

import SocietyDetailContainer from './containers/SocietyDetailContainer';
import SocietyList from './containers/SocietyList';

export default function Society({match}) {
    return (
        <>
            <Switch>
                <Route path={`${match.url}/:id`} component={SocietyDetailContainer}/>
                <Route path={`${match.url}`} exact component={SocietyList}/>
            </Switch>
        </>
    );
}
