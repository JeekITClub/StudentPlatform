import React from 'react';
import {Route, Switch} from "react-router-dom";

import Member from "./members";
import Credit from "./credit";
import PageCustomizeDrawerMenu from "./page/components/PageCustomizeDrawerMenu";

export default function AdminSocietyRouter({match}) {
    return (
        <Switch>
            <Route path={`${match.url}/member`} component={Member}/>
            <Route path={`${match.url}/credit`} component={Credit}/>
            <Route path={`${match.url}/page`} component={PageCustomizeDrawerMenu}/>
        </Switch>
    )
}