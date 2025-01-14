import { Link, useNavigate } from 'react-router';
import { RiMenu2Fill } from 'react-icons/ri';
import DarkModeToggler from '../shared/DarkModeToggler';
import { asset } from '../../utils/asset';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

const Header = () => {
    const navigate = useNavigate();
    const { user, logOut } = useAuth();
    const [dropdown, setDropdown] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate("/login")
            })
            .catch((error) => {
                Toast.fire({
                    icon: "error",
                    title: error.message,
                });
            })
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    {/* Mobile Menu Button */}
                    <button tabIndex={0} className="btn btn-ghost lg:hidden">
                        <RiMenu2Fill className='h-5 w-5' />
                    </button>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link to="/" className='text-lg'>Home</Link></li>
                        <li><Link to="/services" className='text-lg'>Services</Link></li>
                        <li><Link to="/membership" className='text-lg'>Membership</Link></li>
                        {user && <li><Link to="/add-service" className='text-lg'>Add Service</Link></li>}
                    </ul>
                </div>
                {/* Logo and Title */}
                <Link className="flex justify-between items-center gap-1">
                    <img src={asset("icons/logo.png")} alt="Rate Cloud Logo" className="w-12 h-12" />
                    <p className="text-secondary text-xl font-semibold"><span className="text-primary">Rate</span> Cloud</p>
                </Link>
            </div>
            {/* Navbar Center  */}
            <div className="navbar-center hidden lg:flex">
                <ul className="flex justify-center items-center gap-4 text-lg">
                    <li><Link to="/" className='hover:text-secondary'>Home</Link></li>
                    <li><Link to="/services" className='hover:text-secondary'>Services</Link></li>
                    {user && <li><Link to="/add-service" className='hover:text-secondary'>Add Service</Link></li>}
                    <li><Link to="/membership" className='hover:text-secondary'>Membership</Link></li>
                </ul>
            </div>
            {/* Navbar End */}
            <div className="navbar-end gap-2">
                <DarkModeToggler />
                {user ? (
                    <div className="relative">
                        <button className='cursor-pointer' onClick={() => setDropdown(!dropdown)}>
                            <img src={user.photoURL} alt={user.displayName} className='w-14 h-14 rounded-full object-cover border-2 border-primary' />
                        </button>
                        {dropdown && (
                            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box gap-2 z-5 mt-3 w-52 p-2 right-1 absolute shadow">
                                <h1 className='text-lg text-center font-semibold text-neutral'>{user?.displayName}</h1>
                                <li><Link to="/my-profile" className='text-lg hover:text-primary' onClick={() => setDropdown(false)}>My Profile</Link></li>
                                <li><Link to="/my-services" className='text-lg hover:text-primary' onClick={() => setDropdown(false)}>My Services</Link></li>
                                <li><Link to="/my-reviews" className='text-lg hover:text-primary' onClick={() => setDropdown(false)}>My Reviews</Link></li>
                                <button onClick={handleLogOut} className='btn btn-primary hover:btn-secondary text-white text-lg'>Log Out</button>
                            </ul>
                        )}
                    </div>
                ) : (
                    <div className='flex items-center gap-4'>
                        <Link to="/login" className="text-neutral text-lg font-medium hover:text-primary">Login</Link>
                        <Link to="/register" className="btn btn-primary hover:btn-secondary text-white">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;