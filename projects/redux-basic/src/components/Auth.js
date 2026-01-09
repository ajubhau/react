import classes from './Auth.module.css';
import { authAction } from '../store/authReducer';
import { counterAction } from '../store/counter';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    dispatch(authAction.onLogin());
    dispatch(counterAction.resetCounter());
    navigate('/home');
  }
  return (
    <main className={classes.auth}>
      <section>
        <form>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button onClick={handleLogin}>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
