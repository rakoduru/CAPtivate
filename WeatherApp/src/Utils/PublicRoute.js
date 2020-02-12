import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getToken } from './Common';

// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
  return (
    <Switch>
      <Route
        {...rest}
        render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard' }} />}
      />
      <Route
        {...rest}
        render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/jobs' }} />}
      />
    </Switch>
  )
}

export default PublicRoute;
