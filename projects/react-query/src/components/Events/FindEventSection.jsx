import { useRef, useState } from 'react';
import { fetchEvents } from '../../util/http';
import { useQuery } from '@tanstack/react-query';
import EventItem from './EventItem';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setsearchTerm] = useState();
  const {data, isLoading, error} = useQuery({
    queryKey: ['events', {search: searchTerm}],
    queryFn: ({signal}) => fetchEvents({searchTerm, signal}),
    enabled: searchTerm !== undefined // enabled and diabled query using enabled key (service only loaded when is it true)
  });

  function handleSubmit(event) {
    event.preventDefault();
    setsearchTerm(searchElement.current.value);
  }

  let content;
  
    if (isLoading) {
      content = <LoadingIndicator />;
    }
  
    if (error) {
      content = (
        <ErrorBlock title="An error occurred" message="Failed to fetch events" />
      );
    }
  if (data) {
      content = (
        <ul className="events-list">
          {data.map((event) => (
            <li key={event.id}>
              <EventItem event={event} />
            </li>
          ))}
        </ul>
      );
    }
  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      <p>Please enter a search term and to find events.</p>
      {content}
    </section>
  );
}
