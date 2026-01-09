import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PageNotFound from './pages/PageNotFound';
import Rootlayout from './pages/Rootlayout';
import Dashboard from './pages/Dashboard';
import ProtectedRoutes from './components/ProtectedRoutes';
import User from './pages/User';

const router = createBrowserRouter([
  {path: '', element: <Login />},
  {path: '/login', element: <Login />},
  {path: '/signup', element: <Signup />},
  {path: '*', element: <PageNotFound />},
  {
    path: '/dashboard',
    element: <ProtectedRoutes><Rootlayout /></ProtectedRoutes>, //protect routes from unwanted unauthorize access
    children: [
      { path: '', element: <Dashboard />},
      { path: 'user', element: <User />}
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
