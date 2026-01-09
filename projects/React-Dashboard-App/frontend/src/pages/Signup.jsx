import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";

function Signup() {
    const navigation = useNavigate();

    async function handleUserSignup(user) {
        const response = await fetch('http://localhost:8080/signup', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        });
        await response.json();
        if(!response.ok) {
            throw new Error('failed to signup');
        }
        navigation('/')
    }
    return <>
        <SignupForm userSignup={handleUserSignup} />
    </>
}

export default Signup;