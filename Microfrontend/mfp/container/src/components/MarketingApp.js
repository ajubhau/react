import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function MarketingApp() {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const  { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            // onNavigate is callback function passing to marketing for listen, should update memory browser router
            onNavigate: ({ pathname: nextPathname }) => {
                const pathname = history.location.pathname;
                
                if (pathname !== nextPathname) {
                    // Syncing history object
                    // useHistory hooks to access browser router object and update the current path using push method.
                    history.push(nextPathname);
                }
            }
        });
        
        history.listen(onParentNavigate);
    }, [])
    return <div ref={ref}></div>
}