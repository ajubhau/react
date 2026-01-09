import { useEffect, useState } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";

import EventForm from "../components/EventForm";

export default function EditEventPage() {
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
            <h1>Edit Event Page</h1>
            <EventForm method="PATCH" event={data}/>
        </>
    )
}