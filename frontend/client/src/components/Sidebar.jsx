import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import search_icon from '../assets/search_icon.svg'
import upload_icon from '../assets/upload_icon.svg'
import dashboard_icon from '../assets/dashboard_icon.svg'
// import logout from '../assets/logout.svg'


const Sidebar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: dashboard_icon },
        { name: 'Upload Resume', path: '/upload', icon: upload_icon },
        { name: 'Search Resume', path: '/search', icon: search_icon },
    ];

    return (
        <div className='w-12 items-center md:items-stretch md:w-[20%] md:min-w-[290px] border-r min-h-screen text-base border-gray-500
        flex flex-col bg-[rgb(217,234,253)]'>
            <div>
                {menuItems.map((item, index) => (
                <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center px-2 w-full h-[70px] py-3 transition-colors
                    ${location.pathname === item.path ? 'bg-blue-300' : ''}`}
                >
                    <span><img className='w-7 min-w-7 px-2' src={item.icon} alt="" /></span>
                    <span className="hidden md:block text-gray-700 px-2">{item.name}</span>
                </Link>

                ))}
            </div>

            {/* <div className='mt-auto'>
                <Link
                    to="/"
                    onClick={handleLogout}
                    className={`flex items-center px-2 w-full h-[70px] py-3 transition-colors hover:bg-blue-300`}
                >
                    <span><img className='w-7 min-w-7 px-2' src={logout} alt="" /></span>
                    <span className="hidden md:block text-gray-700 px-2">Logout</span>
                </Link>
            </div> */}
            
        </div>
    )
}

export default Sidebar 