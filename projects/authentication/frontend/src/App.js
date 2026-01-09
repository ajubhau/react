import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage from './pages/Authentication';
import {action as authAction} from './components/AuthForm';
import {action as authLogout} from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './util/auth';
import ProtectedRoutes from './components/ProtectedRoutes';
import PageNotFound from './pages/PageNotFound';
import { lazy, Suspense } from 'react';

const Event = lazy(() => import('./pages/Events'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            // element: <EventsPage />,
            element: <Suspense fallback="Loading...."><Event /></Suspense>, //lazy loading for events page
            loader: eventsLoader,
            // loader: () => import('./pages/Events').then(module => module.loader()) //another way to implement lazy loading
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: (<ProtectedRoutes><EditEventPage /></ProtectedRoutes>),
                action: manipulateEventAction,
                // loader: checkAuthLoader, // also use this loader for specific route protection
              },
            ],
          },
          {
            path: 'new',
            element: (<ProtectedRoutes><NewEventPage /></ProtectedRoutes>),
            action: manipulateEventAction,
            // loader: checkAuthLoader, // also use this loader for specific route protection
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction
      },
      {
        path: 'logout',
        action: authLogout
      }
    ],
  },
  {
    path: '*', element: <PageNotFound />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
