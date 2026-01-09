import EventItem from '../components/EventItem';
import { useState, useEffect } from 'react';
import { useLoaderData, useParams, useRouteLoaderData, redirect } from 'react-router-dom';

export default function EventDetailPage() {
    // const [data, setGetDataId] = useState({});
    // const { eventId } = useParams();

    // useEffect(() => {
    //     async function getDataId() {
    //         const response = await fetch(`http://localhost:8080/events/${eventId}`);
    //         const resData = await response.json();
    //         setGetDataId(resData.event);        
    //     }
    //     getDataId();
    // }, [eventId,setGetDataId])

    const data = useRouteLoaderData('event-detail');

    return (
        <>
            <h1>Event detail page</h1>
            <EventItem event={data} />
        </>
    )
}

export async function loader({params}) {
    const eventId = params.eventId;
    const response = await fetch(`http://localhost:8080/events/${eventId}`);
    const resData = await response.json();
    return resData.event;
}

export async function action({request, params}) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method
    });
    if (!response.ok) {
        throw new Error('Error occured');
    }
    return redirect('/events');
}