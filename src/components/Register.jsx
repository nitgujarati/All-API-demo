import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async () => {
        if (!name || !email || !password) {
            alert("Please fill in all fields");
            return;
        }
        try {
            const data = { name, email, password };
            const response = await fetch('http://localhost:1024/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);
            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token", JSON.stringify(result.accessToken));
            navigate('/singup');
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    const googleSignUp = async (response) => {
        try {
            const { credential } = response;
            const result = await fetch('http://localhost:1024/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: credential })
            });
            if (!result.ok) throw new Error('Failed to sign up with Google');
            const data = await result.json();
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", JSON.stringify(data.accessToken));
            navigate('/singup');
        } catch (error) {
            console.error("Error signing up with Google:", error);
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

                <button onClick={ signUp } type="button" className="submit">
                    Sign up
                </button>
                <GoogleOAuthProvider clientId="586409952265-eurbiggp1discjbgh8eq5cb45mmqn9ut.apps.googleusercontent.com"> {/* Ensure you have your Client ID in your .env file */ }
                    <GoogleLogin
                        onSuccess={ googleSignUp }
                        onError={ () => console.log('Login Failed') }
                    />
                </GoogleOAuthProvider>

            </div>
        </div>

    );
};

export default Register;
