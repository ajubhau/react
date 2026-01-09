import { NavLink } from "react-router-dom";
import classes from './Sidebar.module.css';

function Sidebar() {
    return <>
        <div className={classes.sidenav}>
            <NavLink to='/dashboard/user'>User</NavLink>
            <NavLink>Services</NavLink>
            <NavLink>Clients</NavLink>
            <NavLink>Contact</NavLink>
        </div>
    </>
}

export default Sidebar;