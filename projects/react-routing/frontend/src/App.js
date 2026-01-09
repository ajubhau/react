// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page component


import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootRouter from './pages/RootRouter';
import EventRoot from './pages/EventRoot';
import HomePage from './pages/Home';
import EventsPage, { loader as getEventList } from './pages/EventsPage';
import EventDetailPage, { loader as getDetailEventList, action as deleteEventAction } from './pages/EventDetailPage';
import NewEventPage from './pages/NewEventPage';
import EditEventPage from './pages/EditEventPage';
import { action as sendData } from './components/EventForm';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Dashboard from './components/products/Dashboard';
import Product from './components/products/Product';
import isTokenExpired from './utils/auth';

const ProtectedRoutes = ({children}) => {
  const token = JSON.parse(localStorage.getItem('token'));
  
  if (token && !isTokenExpired(token)) {
    return children;
  } else {
    localStorage.clear();
    return <Navigate to="/signin" />
  }
  // return (token && !isTokenExpired(token)) ? children : <Navigate to="/signin" />;
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootRouter />,
      children: [
        {index: true, element: <HomePage />},
        { 
          path: 'events', 
          element: <EventRoot />,
          children: [
            {index: true, element: <EventsPage />, loader: getEventList},
            {
              path: ':eventId',
              id: 'event-detail',
              loader: getDetailEventList,
              children: [
                {index: true, element: <EventDetailPage />, action: deleteEventAction},
                {path: 'edit', element: <EditEventPage />, action: sendData}
              ]
            },
            {path: 'new', element: <NewEventPage />, action: sendData},
          ]
        },
        { path: 'dashboard',
          element: <ProtectedRoutes>
                      <Dashboard />
                    </ProtectedRoutes>
        },
        { path: 'add-product', 
          element: <ProtectedRoutes>
                      <Product />
                    </ProtectedRoutes>},
        { path: 'product/:id', 
          element: <ProtectedRoutes>
                      <Product />
                    </ProtectedRoutes>
        }
      ]
    },
    {path: "signup", element: <Signup />},
    {path: "signin", element: <Signin />}
  ])
  return <RouterProvider router={router} />;
}

export default App;
