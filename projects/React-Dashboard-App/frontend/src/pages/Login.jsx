import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";
import { authAction } from "../store/authReducer";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLoginForm(data) {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        if(!response.ok) {
            throw new Error('Plz enter valid username and password.')
        }
        dispatch(authAction.onLogin(resData.data))
        navigate('/dashboard');
    }

    return <>
        <LoginForm userLogin={handleLoginForm} />
    </>
}

export default Login;