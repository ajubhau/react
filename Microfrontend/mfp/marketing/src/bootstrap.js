import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    }); // memory history use for production env only

    if(onNavigate) {
        history.listen(onNavigate); // Update the memory browser router
    }

    ReactDOM.render(<App history={history} />, el);

    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;

            if (pathname !== nextPathname) {
                history.push(nextPathname)
            }
        }
    }
}

// If we are in development and in isolation,
// call mount immediately
if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector("#marketing-dev-app");
    
    if (devRoot) {
        // Use browser history in isolation mode only otherwise url is not updated.
        mount(devRoot, { defaultHistory: createBrowserHistory()}); // Pass empty object in mount function when running in isolation mode.
    }
}

// We are running through container 
// and we should export mount function
export { mount };