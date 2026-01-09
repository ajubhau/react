import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

 import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
     const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        })
        )
    }

     const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const submit = async(event) => {
        event.preventDefault();
        console.log(formData);

        const response = await fetch('https://dummyjson.com/user/login', { 
            method: 'POST', 
            body: JSON.stringify({
                username: 'emilys',
                password: 'emilyspass',
                expiresInMins: 1, // optional, defaults to 60
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const resData = await response.json();
        if(!response.ok) {
            setError(resData.message)
            return;
        }
        localStorage.setItem('token', JSON.stringify(resData.accessToken))
        localStorage.setItem('user', JSON.stringify(resData))
        navigate('/dashboard');
    }
    return <>
        <h1>Signin form</h1>

              <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleChange} value={formData.username} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password&nbsp;&nbsp;
                        <span onClick={togglePasswordVisibility}>
                            {showPassword ?  <FaEyeSlash /> : <FaEye />}
                        </span>
                    </Form.Label>
                    <Form.Control type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                </Form.Group>
                {error && <Alert variant="danger" >{error}</Alert>}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
    </>
}