// import { useEffect, useState } from 'react';
import EventsList from '../components/EventsList';
import { useLoaderData, useNavigation } from 'react-router-dom';

export default function EventsPage() {
    useNavigation() // this hooks use for get state from router
    const event = useLoaderData();
    // const [event, setEventList] = useState([]);
    // useEffect(() => {
    //     async function getData() {
    //         const response  = await fetch('http://localhost:8080/events');
    //         if(!response.ok){
    //             throw new Error('error occured');
    //         }
    //         const resData = await response.json();
    //         setEventList(resData.events);
    //     }
    //     getData();    
    // },[]);
    
    return (
        <>
            <h1>Events Pages</h1>
            <EventsList events={event} />
        </>
    )
}

export async function loader() {
    const response  = await fetch('http://localhost:8080/events');
    if(!response.ok){
        throw new Error('error occured');
    }
    const resData = await response.json();
    return resData.events;
    // const res = new Response('any data', {status: 201})  this new Response() api provided by browser    
}