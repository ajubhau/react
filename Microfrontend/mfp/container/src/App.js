import React, { lazy, Suspense, useState } from "react";

import { BrowserRouter, Switch, Route, useHistory, Router, Redirect  } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Header from "./components/Header";
// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";
import Progress from "./components/Progress";
import { useEffect } from "react";
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const history = createBrowserHistory();

export default function App() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (isLogin) {
            history.push('/dashboard');
        }
    }, [isLogin]);

    // Randomly generate classname in production for css classname collison in host and remotes app.
    const generateClassName = createGenerateClassName({
        productionPrefix: 'ma'
    });

    return <>
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <Header signedIn={isLogin} onSignOut={() => setIsLogin(false)}/>
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route path="/auth">
                            <AuthLazy isLogin={() => setIsLogin(true)} />
                        </Route>
                        <Route path="/dashboard">
                            {!isLogin && <Redirect to="/" />}
                            <DashboardLazy />
                        </Route>
                        <Route path="/">
                            <MarketingLazy />
                        </Route>
                    </Switch>
                </Suspense>  
            </StylesProvider>
        </Router>    
    </>
}