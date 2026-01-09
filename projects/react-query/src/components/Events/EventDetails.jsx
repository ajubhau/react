import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEventDetails, deleteEvent, queryClient } from '../../util/http.js';

import Header from '../Header.jsx';
import Modal from '../UI/Modal.jsx';
import { useRef, useState } from 'react';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
  const deleteDialog = useRef();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    queryKey: ['event-details'],
    queryFn: () => fetchEventDetails(params.id)
  });

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: "none" // disabling automatic refetching after invalidate queries
      });
      navigate('../');
    }
  })

  let content;

  if(isPending) {
    content = (<div id="event-details-content" className='center'>
      <p>Fetching event data...</p>
    </div>)
  }
  if(isError) {
    <div id="event-details-content" className='center'>
      <ErrorBlock title="Failed to load event" message="Plz try again" />
    </div>
  }
  if(data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) 
    content = (<article id="event-details">
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate} @ {data.time}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </article>
    )
  }

  function handleDelete() {
    setShowDeleteModal(true)
  }

  function handleClose() {
    setShowDeleteModal(false)
  }

  function handleDeleteMutataion() {
    mutate(params.id)
  }
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {content}

      {showDeleteModal && (<Modal ref={deleteDialog} onClose={handleClose}>
          <div className='center'>
            <p>Are you sure want to delete?</p>
            {!isDeleting && <p>
                <button onClick={handleClose} className='button'>Cancel</button>&nbsp;&nbsp;
                <button onClick={handleDeleteMutataion} className='button'>Yes</button>
              </p>
            }
            {isDeleting && <p>Deleting event...</p>}
          </div>
        </Modal>)
      }
    </>
  );
}
