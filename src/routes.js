import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./services/auth";

import Feed from './pages/feed/Feed';
import New from './pages/new/New';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Profile from './pages/profile/Profile';
import Messages from './pages/messages/Messages';

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
const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

const Routes = () => (
    <Switch>
        <PrivateRoute path="/" exact component={Feed} />
        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/register" component={Register} />
        <PrivateRoute path="/new" component={New} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/messages" component={Messages} />
        <Route path="*" component={() => <h1>Pagina nao encontrada</h1>} />
    </Switch>
);
export default Routes;