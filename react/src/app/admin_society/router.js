import React from 'react';
import {Route, Switch} from "react-router-dom";

import Member from "./members";
import Credit from "./credit";

export default function AdminSocietyRouter({match}) {
    return (
        <Switch>
            <Route path={`${match.url}/member`} component={Member}/>
            <Route path={`${match.url}/credit`} component={Credit}/>
        </Switch>
    )
}