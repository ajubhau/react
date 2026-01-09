import { Outlet } from "react-router-dom";
import MainNavigation from '../components/MainNavigation';

export default function RootRouter() {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}