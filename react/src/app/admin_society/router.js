import React from 'react';
import {Route, Switch} from "react-router-dom";

import Member from "./members";
import Credit from "./credit";
import JoinRequestList from "./join_request/components/JoinRequestList";
import SocietyProfile from "./profile/containers/SocietyProfile";
import NotFound from "../../shared/NotFound/NotFound";

export default function AdminSocietyRouter({match}) {
    return (
        <Switch>
            <Route path={`${match.url}/members`} component={Member}/>
            <Route path={`${match.url}/credit`} component={Credit}/>
            <Route path={`${match.url}/join_request`} component={JoinRequestList} />
            <Route path={`${match.url}/profile`} component={SocietyProfile}/>
            <Route component={NotFound}/>
        </Switch>
    )
}