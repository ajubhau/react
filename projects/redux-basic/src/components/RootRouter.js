import Header from "./Header";
import { Outlet } from "react-router-dom";
function RootRouter() {
    return (
        <>
            <Header />
            <Outlet></Outlet>
        </>
    )
}

export default RootRouter;