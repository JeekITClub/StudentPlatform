import React from 'react';
import {Switch, Route} from 'react-router-dom';
import MemberList from './containers/MemberList.js'
import MemberDetail from './containers/MemberDetail.js'

export default function Member({match}) {
    return (
        <Switch>
            <Route path={`${match.url}/:student_id`} component={MemberDetail}/>
            <Route path={`${match.url}`} component={MemberList}/>
        </Switch>
    );
}
