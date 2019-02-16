import React from 'react';
import {Route, Switch} from "react-router-dom";

import Member from "./members";
import Credit from "./credit";
import JoinRequestList from "./join_request/components/JoinRequestList";

export default function AdminSocietyRouter({match}) {
    return (
        <Switch>
            <Route path={`${match.url}/members`} component={Member}/>
            <Route path={`${match.url}/credit`} component={Credit}/>
            <Route path={`${match.url}/join_request`} component={JoinRequestList} />
        </Switch>
    )
}