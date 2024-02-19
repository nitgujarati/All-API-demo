
import React, { useEffect, useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const Route = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const Routing = localStorage.getItem("user")
        if (Routing) {
            Route('/singup')
        }
        else {
            Route('/register')
        }
    }, [Route])


    const SignUpButton = async () => {
        if (name === "" || email === "" || password === "") {
            alert("Please fill in all fields");
        } else {
            const data = { name, email, password };
            let result = await fetch('http://localhost:1024/register', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token", JSON.stringify(result.auth));
            console.log(result);
            Route("/singup");
        }
    };
    return (
        <div>
            <div className="form">
                <p className="form-title">Sign up for an account</p>
                <div className="input-container">
                    <input type="text" placeholder="Enter Name" value={ name } onChange={ (e) => setName(e.target.value) } />
                    <span></span>
                </div>
                <div className="input-container">
                    <input type="email" placeholder="Enter email" value={ email } onChange={ (e) => setEmail(e.target.value) } />
                    <span></span>
                </div>
                <div className="input-container">
                    <input type="password" placeholder="Enter password" value={ password } onChange={ (e) => setPassword(e.target.value) } />
                </div>

                <button onClick={ SignUpButton } type="button" className="submit">
                    Sign up
                </button>
            </div>
        </div>
    );
};

export default Register;
