import React from 'react'
import Singup from './components/Singup';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Login /> } />
                    <Route path='/register' element={ <Register /> } />
                    <Route path='/singup' element={ <Singup /> } />
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App
