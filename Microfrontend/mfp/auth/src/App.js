import React from "react";
import {BrowserRouter, Switch, Route, Router} from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Signin from './components/Signin';
import Signup from './components/Signup';

export default function App({ history, isLogin }) {
    return <>
    {/* <h1>dfsf</h1> */}
        <StylesProvider>
            <Router history={history}>
                <Switch>
                    <Route path="/auth/signin">
                        <Signin onSignIn={isLogin} />
                    </Route>
                    <Route path="/auth/signup">
                        <Signup onSignIn={isLogin} />
                    </Route>
                </Switch>
            </Router>
        </StylesProvider>
    </>
}