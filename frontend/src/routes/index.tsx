import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard';

const routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
    </Switch>
  );
}

export default routes;