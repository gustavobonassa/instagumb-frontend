import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./services/auth";

import Feed from './pages/feed/Feed';
import New from './pages/new/New';
import Login from './pages/user/Login';
import Register from './pages/user/Register';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )
        }
    />
);

const Routes = () => (
    <Switch>
        <PrivateRoute path="/" exact component={Feed} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/new" component={New} />
    </Switch>
);
export default Routes;