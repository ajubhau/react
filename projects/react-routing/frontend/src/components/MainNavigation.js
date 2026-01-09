import { NavLink, useNavigate } from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear();
    navigate('/signin');
  }
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? classes.active : null}>Home</NavLink>
          </li>
          <li>
            <NavLink to="events" className={({isActive}) => isActive ? classes.active : null}>Events</NavLink>
          </li>
        </ul>
      </nav>
      <span style={{display: 'flex', listStyleType: 'none'}}>
            {user && <li>Hello, <b>{user.firstName}</b></li>}
            {user && <li onClick={logout}>
              &nbsp;&nbsp;<button>Logout</button>
              </li>
            }
          </span>
    </header>
  );
}

export default MainNavigation;
