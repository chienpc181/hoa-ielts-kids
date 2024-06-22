import './login.css';
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };
    const currentUser = useSelector((state) => state.auth.user);
    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate])

    return (
        <div className='login-page'>
            <div className='card w-full'>
                <h3 className="text-center">Login</h3>
                <form className='p-fluid' onSubmit={handleSubmit}>
                    <div className='field'>
                        <InputText className='p-filled' name='Email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='field'>
                        <Password name='Password' value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} tabIndex={1} placeholder='Password' />
                    </div>
                    <div className='field'>
                        <Button label="Login" type='submit' />
                    </div>
                </form>
                {status === 'loading' && <p>Loading...</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    )
}