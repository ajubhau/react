// import { useState } from 'react';
import { Form, useSearchParams, NavLink, redirect, useActionData, json, useRouteLoaderData } from 'react-router-dom';
import classes from './AuthForm.module.css';

function AuthForm() {
  // below code switch using state hook
  // const [isLogin, setIsLogin] = useState(true);

  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

  const [searchParam] = useSearchParams();
  const isLogin = searchParam.get('mode') === 'login';
  const data = useActionData();

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && <ul>{Object.values(data.errors).map(error => <li key={error}>{error}</li>)}</ul>}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" />
        </p>
        <div className={classes.actions}>
          <NavLink to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            <button type="button">
              {isLogin ? 'Create new user' : 'Login'}
            </button>
          </NavLink>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;

export async function action({request, params}) {
  const formData = await request.formData();
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  }
  // const param = new URLSearchParams(window.location.search);
  const param = new URL(request.url).searchParams;
  const mode = param.get('mode');

  const response  = await fetch('http://localhost:8080/' + mode, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data)
  });

  if(response.status === 422 || response.status === 401) {
    return response;
  }

  if(!response.ok) {
    throw json({message: "Could not authenticate user"}, {status: 500})
  }
  const resData = await response.json();
  const token = resData.token
  localStorage.setItem('token', token)

  return redirect('/');
}
