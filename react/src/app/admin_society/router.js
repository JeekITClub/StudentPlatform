import React from 'react';
import {Route, Switch} from "react-router-dom";

import Member from "./members";

export default function AdminSocietyRouter({match}) {
    return (
        <Switch>
            <Route path={`${match.url}/member`} component={Member}/>
        </Switch>
    )
}