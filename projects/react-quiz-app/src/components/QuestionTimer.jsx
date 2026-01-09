import { useState, useEffect } from "react";

export default function QuestionTimer({timeout, onTimeout}) {
    const [remainingTimeout, setReaminingTimeout] = useState(timeout);

    useEffect(() => {
        const time = setTimeout(onTimeout, timeout);
        return () => {
            clearTimeout(time)
        }
    }, [onTimeout, timeout])
    
    useEffect(() => {
        const interval = setInterval(() => {
            setReaminingTimeout(prevTime => prevTime - 100)
        }, 100);    
        return () => {
            clearInterval(interval);
        }
    }, [])
    
    return (
        <progress max={timeout} value={remainingTimeout}/>
    )
}