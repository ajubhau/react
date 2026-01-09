import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { validEmail, validInput } from '../util/validation';

import classes from './LoginForm.module.css';


function LoginForm({userLogin}) {
     const [error, setError] = useState(false);
    
    function handleFormSubmit(event) {
        event.preventDefault();
        setError(false);
        const entries = new FormData(document.querySelector('form'));
        const formObject = Object.fromEntries(entries);
        if ((validInput(formObject.email) || validInput(formObject.password)) || validEmail(formObject.email)) {
            setError(true);
            return;
        }
        userLogin(formObject)
    }
    return <>
        <div className={classes.main}>
            <h3>Login</h3>
            <form className={classes.form} onSubmit={handleFormSubmit}>
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" />
                </p>
                <p>
                    <label htmlFor="image">Password</label>
                    <input id="password" type="password" name="password" />
                </p>
                {error && <p className={classes.error}>Please enter required or correct value</p>}
                <div className={classes.actions}>
                    <button>Login</button>
                </div>
            </form>
            <p>Don't have a account <NavLink to="/signup">Sign up</NavLink></p>
        </div>
    </>
}

export default LoginForm;