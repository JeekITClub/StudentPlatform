import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SocietyDetail from './containers/SocietyDetail';
import SocietyList from './containers/SocietyList';

export default function Society({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/:id`} component={SocietyDetail} />
      <Route path={`${match.url}`} exact component={SocietyList} />
    </Switch>
  );
}
