import { Outlet } from 'react-router-dom';

import EventsNavigation from '../components/EventsNavigation';
import ProtectedRoutes from '../components/ProtectedRoutes';

function EventsRootLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
      {/* <ProtectedRoutes /> */}
    </>
  );
}

export default EventsRootLayout;
