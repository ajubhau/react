import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Counter from './components/Counter';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';
import RootRouter from './components/RootRouter';
import Home from './components/Home';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootRouter />,
      children: [
        {path: "/", element: <Auth />},
        {path: "/home", element: <Home />},
        {path: "/counter", element: <Counter />},
        {path: "/user-profile", element: <UserProfile />}
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App;
