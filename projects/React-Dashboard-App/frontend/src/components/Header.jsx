import { useDispatch } from 'react-redux';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { authAction } from '../store/authReducer';

function Header() {
    const dispatch = useDispatch();

    function handleClearStorage() {
       dispatch(authAction.onLogout({}));
    }
    return <>
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to="/login" onClick={handleClearStorage}>Logout</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    </>
}

export default Header;