import './NavbarClient.css';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import logo from '../../assets/HoaIeltsKids-logo48.jpg';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function NavbarClient() {
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
    const items = [
        {
            label: 'Class',
            icon: 'pi pi-box',
            items: [
                {
                    label: 'IELTS Kids',
                    icon: 'pi pi-box'
                },
                {
                    label: 'IELTS band 5.5',
                    icon: 'pi pi-box',
                    command: () => navigate('/practices')
                },
                {
                    label: 'IELTS band 6',
                    icon: 'pi pi-box'
                },
                {
                    label: 'IELTS band 7',
                    icon: 'pi pi-box'
                },
                {
                    label: 'Conversation',
                    icon: 'pi pi-box'
                },
            ]
        },
        {
            label: 'Teachers',
            icon: 'pi pi-box',
            // url: 'teachers',
            command: () => navigate('/teachers')
        },
        {
            label: 'Students',
            icon: 'pi pi-box',
            command: () => navigate('/students')
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        },
        {
            label: 'Stories',
            icon: 'pi pi-book',
            command: () => navigate('/stories')
        }
    ];
    const start = <div className='logo' role='button' onClick={onClickLogo}>
        <Avatar image={logo} size="large" shape="circle" />
        {/* <h4>HOA</h4> */}
        <div className='ml-1'>
            <h4 style={{color:'royalblue', margin:'0'}}>IELTS</h4>
            <h4 style={{color:'orangered', margin:'0'}}>KiDs</h4>
        </div>
    </div>
    const end = <div className='user-bar'>
        {currentUser && <div>{currentUser.name}</div>}
        {!currentUser && <Button className='ml-3' severity="primary" aria-label="Login in" onClick={onLoginClick}>Login</Button>}
        {!currentUser && <Button className='ml-3' severity="primary" aria-label="Register" onClick={onRegisterClick}>Register</Button>}
        {currentUser && <Button className='ml-3' severity="secondary" aria-label="Log out" onClick={onSignOutClick}>Logout</Button>}
    </div>
    return (
        <div className='navbar-client'>
            <div className='content'>
                <Menubar model={items} start={start} end={end}/>
            </div>
        </div>
    )
}