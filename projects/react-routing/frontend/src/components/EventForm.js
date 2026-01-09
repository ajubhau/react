import { Form, useNavigate, useNavigation, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'; //Updating state based on UI submitting state

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Save"}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({request, params}) {
    const form = await request.formData();
    const data = {
        title: form.get('title'),
        image: form.get('image'),
        date: form.get('date'),
        description: form.get('description')
    }

    let url = "http://localhost:8080/events";
    if (request.method === "PATCH") {
      const eventId = params.eventId;
      url = "http://localhost:8080/events/" + eventId;
    }
    const response = await fetch(url, {
        method: request.method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    // const resData = await response.json();
    if(!response.ok) {
        throw new Error('error ocured');        
    }
    
    return redirect('/events');
}
