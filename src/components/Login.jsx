// Login.js
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



    const handleLogin = async () => {
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
            console.log(result);
            if (result.user) {
                localStorage.setItem("user", JSON.stringify(result.user));
                localStorage.setItem("token", JSON.stringify(result.accessToken));
                Route("/singup");
            } else {
                alert("Please enter correct credentials");
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
                <button onClick={ handleLogin } type="button" className="submit">
                    Login
                </button>

                <button onClick={ SingButton } type="button" className="submit">
                    singup
                </button>
            </div>

        </div>
    );
};

export default Login;
