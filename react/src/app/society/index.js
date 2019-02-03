import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SocietyDetailContainer from './containers/SocietyDetailContainer';
import SocietyList from './containers/SocietyList';
import SocietyMainContainer from './containers/SocietyMainContainer';

export default function Society({match}) {
    return (
        <SocietyMainContainer>
            <Switch>
                <Route path={`${match.url}/:id`} component={SocietyDetailContainer}/>
                <Route path={`${match.url}`} exact component={SocietyList}/>
            </Switch>
        </SocietyMainContainer>
    );
}
