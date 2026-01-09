// import React from 'react';
// import './App.css';
// import Header from 'host/Header';
// import Footer from 'host/Footer';

import { Outlet } from "react-router-dom";

// import React, { lazy, Suspense } from 'react';

// const Header = lazy(() => import('host/Header')); // 'remoteApp' matches the remote name in webpack config
// const Footer = lazy(() => import('host/Footer'));

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import About from './components/About';
import MainLayout from './MainLayout';


function App() {
  const routes = createBrowserRouter([
  {
    path: '',
    element: <About />,
    // children:[
    //   // {path: "/about", element: < />},
    //   {path: 'about', element: <About />}
    // ]
  },
])

  return <RouterProvider router={routes} />
}

export default App;
