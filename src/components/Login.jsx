
import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const Route = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        const Routing = localStorage.getItem("user")
        if (Routing) {
            Route('/singup')
        }
        else {
            Route('/')
        }
    }, [Route])

    const SingButton = () => {
        Route("/register");
    }

    const LoginButton = async () => {

        if (email === "" || password === "") {
            alert("Please fill in all fields");
        } else {
            const data = { email, password };
            let result = await fetch('http://localhost:1024/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            console.log(result);
            if (result.name) {
                localStorage.setItem("user", JSON.stringify(result));
                Route("/singup");
            }
            else {
                alert("please enter correct item")
            }
        }

    };

    return (
        <div>
            <div className="form">
                <p className="form-title">Login to your account</p>
                <div className="input-container">
                    <input type="email" placeholder="Enter email" value={ email } onChange={ (e) => setEmail(e.target.value) } />
                    <span></span>
                </div>
                <div className="input-container">
                    <input type="password" placeholder="Enter password" value={ password } onChange={ (e) => setPassword(e.target.value) } />
                </div>
                <button onClick={ LoginButton } type="button" className="submit">
                    Login
                </button>
                <button onClick={ SingButton } type="button" className="submit">
                    Sign up
                </button>
            </div>
        </div>
    );
};

export default Login;
