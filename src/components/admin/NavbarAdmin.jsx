import './NavbarAdmin.css';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import logo from '../../assets/HoaIeltsKids-logo48.jpg';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function NavbarAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user);
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
        <header className='navbar-admin'>
            <div className='content'>
                <div className='logo'>
                    <Avatar image={logo} className="mr-2" size="large" shape="circle" />
                    <h4>HOA IELTS KiDS</h4>
                </div>
                <div className='user-bar'>
                    {currentUser && <div>{currentUser.name}</div>}
                    {!currentUser && <Button className='ml-3' severity="primary" aria-label="Login in" onClick={onLoginClick}>Login</Button>}
                    {!currentUser && <Button className='ml-3' severity="primary" aria-label="Register" onClick={onRegisterClick}>Register</Button>}
                    {currentUser && <Button className='ml-3' severity="secondary" aria-label="Log out" onClick={onSignOutClick}>Logout</Button>}
                </div>
            </div>


        </header>
    )
}