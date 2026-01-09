import Header from "../components/Header";
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/Sidebar";

function Rootlayout() {
    return <>
        <Header />
        <Sidebar />
        <main>
            <Outlet />
        </main>
    </>
}
export default Rootlayout;