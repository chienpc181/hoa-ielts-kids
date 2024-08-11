
import React, { useState, useEffect, useRef } from 'react';
import './NavbarClient.css';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import logo from '../../assets/HoaIeltsKids-logo48.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { OverlayPanel } from 'primereact/overlaypanel';

export default function NavbarClient() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user);
    const [visibleLeft, setVisibleLeft] = useState(false);
    const op = useRef(null);

    const currentUrl = window.location.href;

    useEffect(() => {
        setVisibleLeft(false)
    }, [currentUrl])

    const onSignOutClick = async () => {
        await dispatch(logout());
        navigate('/login');
    }

    const onClickLogo = () => {
        navigate('/');
    }

    const onLoginClick = () => {
        op.current.hide()
        navigate('/login');
    }

    const onRegisterClick = () => {
        op.current.hide()
        navigate('/register');
    }

    return (
        <header>
            <div className='navbar-client desktop-navbar'>
                <div className='content'>
                    <div className='navbar-start'>
                        <div className='logo' role='button' onClick={onClickLogo}>
                            <Avatar image={logo} size="large" shape="circle" />
                            <div className='ml-1'>
                                <span style={{ color: 'royalblue', fontWeight: 'bolder' }}>IELTS</span>
                                <br></br>
                                <span style={{ color: 'orangered', fontWeight: 'bolder' }}>KiDs</span>
                            </div>
                        </div>
                        <nav className='nav-links'>
                            <NavLink to="/practices" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Classes</NavLink>
                            <NavLink to="/teachers" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Teachers</NavLink>
                            <NavLink to="/students" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Students</NavLink>
                            <NavLink to="/documents" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Documents</NavLink>
                            <NavLink to="/lessons" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Lessons</NavLink>
                            <NavLink to="/stories" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Stories</NavLink>
                            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Contact</NavLink>
                        </nav>
                    </div>
                    <div className='navbar-end'>
                        {currentUser && <div>{currentUser.name}</div>}
                        {!currentUser && <Button className='ml-3' severity="primary" aria-label="Login in" onClick={onLoginClick}>Login</Button>}
                        {!currentUser && <Button className='ml-3' severity="primary" aria-label="Register" onClick={onRegisterClick}>Register</Button>}
                        {currentUser && <Button className='ml-3' severity="secondary" aria-label="Log out" onClick={onSignOutClick}>Logout</Button>}
                    </div>
                </div>
            </div>
            <div className='navbar-client mobile-navbar'>
                <Button icon="pi pi-bars" onClick={() => setVisibleLeft(true)} />
                <div className='logo' role='button' onClick={onClickLogo}>
                    <Avatar image={logo} size="large" shape="circle" />
                    <div className='ml-1'>
                        <span style={{ color: 'royalblue', fontWeight: 'bolder' }}>IELTS</span>
                        <br></br>
                        <span style={{ color: 'orangered', fontWeight: 'bolder' }}>KiDs</span>
                    </div>

                </div>
                <div>
                {currentUser && <Button icon="pi pi-user" rounded aria-label="User" onClick={(e) => op.current.toggle(e)}/>}
                {!currentUser && <Button icon="pi pi-user" rounded severity="secondary" aria-label="User" onClick={(e) => op.current.toggle(e)}/>}
                <OverlayPanel ref={op} appendTo={document.getElementById('app-container')} style={{ maxWidth: '700px' }}>
                <div >
                        {currentUser && <div className='mb-6'>{currentUser.name}</div>}
                        <hr></hr>
                        {!currentUser && <Button className='ml-3' severity="primary" aria-label="Login in" onClick={onLoginClick}>Login</Button>}
                        {!currentUser && <Button className='ml-3' severity="primary" aria-label="Register" onClick={onRegisterClick}>Register</Button>}
                        {currentUser && <Button className='ml-3' severity="secondary" aria-label="Log out" onClick={onSignOutClick}>Logout</Button>}
                    </div>
            </OverlayPanel>
                </div>
                
                <Sidebar visible={visibleLeft} position="left" style={{width: '250px'}} onHide={() => setVisibleLeft(false)}>

                    <nav className='nav-links'>
                        <NavLink to="/practices" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Classes</NavLink>
                        <NavLink to="/teachers" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Teachers</NavLink>
                        <NavLink to="/students" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Students</NavLink>
                        <NavLink to="/documents" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Documents</NavLink>
                        <NavLink to="/lessons" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Lessons</NavLink>
                        <NavLink to="/stories" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Stories</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Contact</NavLink>
                    </nav>

                </Sidebar>
            </div>
        </header>
    );
}


