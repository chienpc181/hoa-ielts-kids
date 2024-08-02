// import React from 'react';
// import './NavbarClient.css';
// import { Button } from 'primereact/button';
// import { Avatar } from 'primereact/avatar';
// import logo from '../../assets/HoaIeltsKids-logo48.jpg';
// import { Menubar } from 'primereact/menubar';
// import { useNavigate, Link, NavLink } from 'react-router-dom';
// import { logout } from '../../features/auth/authSlice';
// import { useDispatch, useSelector } from 'react-redux';

// export default function NavbarClient() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const currentUser = useSelector((state) => state.auth.user);
//     const onSignOutClick = async () => {
//         await dispatch(logout());
//         navigate('/login');
//     }

//     const onClickLogo = () => {
//         navigate('/');

//     }
//     const onLoginClick = () => {
//         navigate('/login');
//     }
//     const onRegisterClick = () => {
//         navigate('/register');
//     }
//     const items = [
//         {
//             label: 'Class',
//             icon: 'pi pi-box',
//             items: [
//                 {
//                     label: 'IELTS Kids',
//                     icon: 'pi pi-box'
//                 },
//                 {
//                     label: 'IELTS band 5.5',
//                     icon: 'pi pi-box',
//                     command: () => navigate('/practices')
//                 },
//                 {
//                     label: 'IELTS band 6',
//                     icon: 'pi pi-box'
//                 },
//                 {
//                     label: 'IELTS band 7',
//                     icon: 'pi pi-box'
//                 },
//                 {
//                     label: 'Conversation',
//                     icon: 'pi pi-box'
//                 },
//             ]
//         },
//         {
//             label: 'Teachers',
//             icon: 'pi pi-box',
//             // url: 'teachers',
//             command: () => navigate('/teachers')
//         },
//         {
//             label: 'Students',
//             icon: 'pi pi-box',
//             command: () => navigate('/students')
//         },
//         {
//             label: 'Documents',
//             icon: 'pi pi-book',
//             command: () => navigate('/documents')
//         },
//         {
//             label: 'Lessons',
//             icon: 'pi pi-book',
//             command: () => navigate('/lessons')
//         },
//         {
//             label: 'Stories',
//             icon: 'pi pi-book',
//             command: () => navigate('/stories')
//         },
//         {
//             label: 'Contact',
//             icon: 'pi pi-envelope'
//         },
//     ];
//     const start = <div className='logo' role='button' onClick={onClickLogo}>
//         <Avatar image={logo} size="large" shape="circle" />
//         {/* <h4>HOA</h4> */}
//         <div className='ml-1'>
//             <h4 style={{color:'royalblue', margin:'0'}}>IELTS</h4>
//             <h4 style={{color:'orangered', margin:'0'}}>KiDs</h4>
//         </div>
//     </div>
//     const end = <div className='user-bar'>
//         {currentUser && <div>{currentUser.name}</div>}
//         {!currentUser && <Button className='ml-3' severity="primary" aria-label="Login in" onClick={onLoginClick}>Login</Button>}
//         {!currentUser && <Button className='ml-3' severity="primary" aria-label="Register" onClick={onRegisterClick}>Register</Button>}
//         {currentUser && <Button className='ml-3' severity="secondary" aria-label="Log out" onClick={onSignOutClick}>Logout</Button>}
//     </div>
//     return (
//         <div className='navbar-client'>
//             <div className='content'>
//                 <Menubar model={items} start={start} end={end}/>
//             </div>
//         </div>
//     )
// }









import React, { useState } from 'react';
import './NavbarClient.css';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import logo from '../../assets/HoaIeltsKids-logo48.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function NavbarClient() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user);
    const [visibleLeft, setVisibleLeft] = useState(false);

    const onSignOutClick = async () => {
        await dispatch(logout());
        navigate('/login');
    }

    const onClickLogo = () => {
        navigate('/');
    }

    const onLoginClick = () => {
        navigate('/login');
    }

    const onRegisterClick = () => {
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
                {/* <div className='auth-buttons'>
                    {currentUser && <Button severity="secondary" aria-label="Log out" onClick={onSignOutClick}>Logout</Button>}
                    {!currentUser && <Button severity="primary" aria-label="Login in" onClick={onLoginClick}>Login</Button>}
                    {!currentUser && <Button severity="primary" aria-label="Register" onClick={onRegisterClick}>Register</Button>}
                </div> */}
                <Button icon="pi pi-user" rounded severity="info" aria-label="User" />
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


