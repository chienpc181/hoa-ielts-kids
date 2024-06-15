import './NavbarAdmin.css';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import logo from '../../assets/HoaIeltsKids-logo48.jpg';

export default function NavbarAdmin() {
    const onSignOutClick = () => {
        alert('abc')
    }
    return (
        <div className='navbar-admin'>
            <div className='sidebar-header'>
                <Avatar image={logo} className="mr-2" size="large" shape="circle" />
                <h2>HOA IELTS KiDS</h2>
            </div>
            <div className='user-bar'>
                <span className='font-italic'>Welcome</span>
                <label className='ml-1'>Chien Pham</label>
                <Button icon="pi pi-sign-out" className='ml-3' rounded outlined severity="secondary" aria-label="Sign out" onClick={onSignOutClick}/>
            </div>
            
        </div>
    )
}