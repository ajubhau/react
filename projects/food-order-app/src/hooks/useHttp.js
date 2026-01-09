import { useEffect, useState, useCallback, useContext } from "react";
import CartContext from "../util/CartContext.jsx";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();
    if(!response.ok) {
        throw new Error(resData.message || 'Something went wrong, failed to send request')
    }
    return resData;
}

export default function useHttp(url, dataConfig, initialState) {
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const sendData = useCallback(
        async function sendData(data) {
            setLoading(true);
            try {
                const res = await sendHttpRequest(url, {...dataConfig, body: data});   
                setData(res);
            } catch(error) {
                setError(error.message || 'Something went worong, failed to send request.')
            }
            setLoading(false)
        },
        [url, dataConfig]
    )

    useEffect(() => {
        if((dataConfig && (dataConfig.method === 'GET' || !dataConfig.method)) || !dataConfig) {
            sendData();
        }
        return;
    },[sendData])
    
    return {
        data,
        loading,
        error,
        sendData
    }    
}