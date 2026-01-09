import classes from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from '../store/authReducer';
import { useNavigate, NavLink } from 'react-router-dom';

const Header = () => {
  const auth = useSelector((state) => state.auth.isLogin);
  const totalCount = useSelector((state) => state.counter.counter);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(authAction.onLogout());
    navigate('/')     
  }
  const DEFAULT_ROUTES = [
    {path: '/home', label: 'Home'},
    {path: '/counter', label: 'My Products'},
    {path: '/user-profile', label: 'My Sales'},
  ];
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {auth && <nav>
        <ul>
          {DEFAULT_ROUTES.map(item => <li key={item.label}>
            <NavLink to={item.path} className={({ isActive }) => (isActive ? 'green' : 'none')}>{item.label}</NavLink>
          </li>)}  
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
          <li>Count {totalCount}</li>
        </ul>
      </nav>}
    </header>
  );
};

export default Header;
