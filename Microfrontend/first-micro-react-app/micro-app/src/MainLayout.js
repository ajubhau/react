import React from "react";
import { Outlet } from "react-router-dom";
 import Header from 'host/Header'; // 'remoteApp' matches the remote name in webpack config
import Footer from 'host/Footer';

export default function MainLayout() {
    return <>
        <Header />
            <Outlet />
        <Footer />
    </>
}