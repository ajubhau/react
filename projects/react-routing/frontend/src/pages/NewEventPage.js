import EventForm from "../components/EventForm";

export default function NewEventPage() {
    return (
        <>
            <h1>New Event page</h1>
            <EventForm method="POST" />
        </>
    )
}