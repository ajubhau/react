import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from 'history';

// Mount function to start up the app
const mount = (el, { defaultHistory, onNavigate, initialPath, isLogin}) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    }); // memory history use for production env only

    if(onNavigate) {
        history.listen(onNavigate); // Update the memory browser router
    }
    ReactDOM.render(<App history={history} isLogin={isLogin} />, el);

    return {
        onParentNavigate: ({ pathname: nextPathname}) => {
            const pathname = history.location.pathname;

            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
}

// If we are in development and in isolation,
// call mount immediately
if(process.env.NODE_ENV === 'development') {
    const rootAuth = document.querySelector('#auth-root')

    if(rootAuth) {
        mount(rootAuth, { defaultHistory: createBrowserHistory() });
    }
}

// We are running through container 
// and we should export mount function
export { mount }