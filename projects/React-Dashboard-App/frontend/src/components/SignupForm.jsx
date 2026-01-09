import { NavLink } from 'react-router-dom';
import { FormEvent } from 'react';
import classes from './SignupForm.module.css';
import { validInput, validEmail } from '../util/validation';
import { useState } from 'react';

function SignupForm({userSignup}) {

    const [error, setError] = useState(false);

    function handleFormSubmit(event) {
        event.preventDefault();
        setError(false);
        const entries = new FormData(document.querySelector('form'));
        const formObject = Object.fromEntries(entries);
        if ((validInput(formObject.name) || validInput(formObject.email) || validInput(formObject.password)) || validEmail(formObject.email)) {
            setError(true);
            return;
        }
        userSignup(formObject)
    }
    return <>
        <div className={classes.main}>
            <h3>Signup</h3>
            <form className={classes.form} onSubmit={handleFormSubmit}>
                <p>
                    <label htmlFor="name">Full name</label>
                    <input id="name" type="name" name="name" required />
                </p>
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required />
                </p>
                <p>
                    <label htmlFor="image">Password</label>
                    <input id="password" type="password" name="password" required />
                </p>
                {error && <p className={classes.error}>Please enter required or correct value</p>}
                <div className={classes.actions}>
                    <button>Signup</button>
                </div>
            </form>
            <p>Already have a account <NavLink to="/login">Login</NavLink></p>
        </div>
    </>
}

export default SignupForm;