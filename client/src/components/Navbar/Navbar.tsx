import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import decode from 'jwt-decode';

import { useDispatch } from 'react-redux';

export default function Navbar() {
    
    const[user, setUser] = useState(JSON.parse(localStorage.getItem('profile')!));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const location = useLocation();

    const tokenCheck = () => {
        const token = user?.token;
    
        if(token) {
            const decodedToken : any = decode(token);

            if(decodedToken?.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
    }

    useEffect(() => {
        tokenCheck();
        setUser(JSON.parse(localStorage.getItem('profile')!));
    }, [location]);

    useEffect(() => {
        tokenCheck();
    }, [])

    useEffect(() => {
        if(location.pathname !== '/' && user && user.result.verified === true) {
            navigate('/listener');
        }
        else if(location.pathname !== '/verifyEmail' && user && user.result.verified === "false") {
            navigate('/verifyEmail');
        }
    }, [user]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        navigate('/home');

        setUser(null);
    }

  return (
    <div className='flex justify-between h-[10vh] gradient_btn'>
        <div className='flex items-center justify-center flex-[0.25] md:ml-0 ml-[20px]'>
            <img src="../../../public/icon.png" alt="logo" className='md:h-[40px] h-[25px]'/>
            <p className='md:text-[25px] text-[15px] font-bold'>Listener</p>
        </div>
        {
            user ? 
            <div className='flex items-center justify-end flex-[0.45] mr-[5vw] gap-12'>
                    <div className='flex gap-2'>
                        <img src={'../../../public/icon.png'} alt="user" className='w-[25px] h-[25px] rounded-[50%]'/>
                        <p className='md:text-[18px] text-[13px] whitespace-nowrap'>{user.result.name}</p>
                    </div>
                <button className='gradient_btn border-black hover:text-blue-600' onClick={logout}>Logout</button>
            </div>
            :
            <div className='flex items-center justify-center flex-[0.45] gap-8'>
                <p className='cursor-pointer whitespace-nowrap'><Link to={'/account/login'} className='text-black'>Sign in</Link></p>
                <button className='px-3 py-2 whitespace-nowrap gradient_btn border-black hover:text-blue-600' onClick={() => {navigate('/account/signup')}}>Get Started</button>
            </div>
        }
    </div>
  )
}