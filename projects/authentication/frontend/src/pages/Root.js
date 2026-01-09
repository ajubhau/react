import { Outlet, useNavigation } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
// import ProtectedRoutes from '../components/ProtectedRoutes';

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
        {/* <ProtectedRoutes />  */}
      </main>
    </>
    // <ProtectedRoutes /> component use for protected routes
  );
}

export default RootLayout;
