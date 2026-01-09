import React, { useEffect, useRef } from "react";
import { mount } from 'auth/AuthApp';
import { useHistory } from 'react-router-dom';

export default function AuthApp({ isLogin }) {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const  { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            // onNavigate is callback function passing to auth for listen, should update memory browser router
            onNavigate: ({ pathname: nextPathname }) => {
                const pathname  = history.location.pathname;

                if(pathname !== nextPathname) {
                    // Syncing history object
                    // useHistory hooks to access browser router object and update the current path using push method.
                    history.push(nextPathname);
                }
            },
            isLogin
        });

        history.listen(onParentNavigate);
    }, [])

    return <div ref={ref}></div>
}