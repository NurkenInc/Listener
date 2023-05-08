import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUser, UserButton } from '@clerk/clerk-react'

import "./Navbar.css";


export default function Navbar() {
  const { user, isSignedIn } = useUser()
  // const [user, setUser] = useState(
  //     JSON.parse(localStorage.getItem("profile")!)
  // );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  // const tokenCheck = () => {
  //     const token = user?.token;

  //     if (token) {
  //         const decodedToken: any = decode(token);

  //         if (decodedToken?.exp * 1000 < new Date().getTime()) {
  //             logout();
  //         }
  //     }
  // };

  // useEffect(() => {
  //     tokenCheck();
  //     setUser(JSON.parse(localStorage.getItem("profile")!));
  // }, [location]);

  // useEffect(() => {
  //     tokenCheck();
  // }, []);

  useEffect(() => {
      if (
        pathname === "/home" &&
        user
      ) {
          navigate("/listener");
          return;
      }
      navigate('/home')
  }, [isSignedIn, user]);

  return (
      <div className='flex justify-between items-center h-[10vh] gradient_btn'>
          <div 
            className='flex items-center justify-center flex-[0.25] md:ml-0 ml-[20px] cursor-pointer'
            onClick={() => navigate('/home')}
          >
              <img
                  src='/icon.png'
                  alt='logo'
                  className='md:h-[40px] h-[25px]'
              />
              <p className='md:text-[25px] text-[15px] font-bold'>Listener</p>
          </div>
          {
            user ?
            <div className='px-4'>
              <UserButton />
            </div>
            : (
                <div className='flex items-center justify-center flex-[0.45] gap-8'>
                    <p className='cursor-pointer whitespace-nowrap'>
                        <Link to={"/account/login"} className='text-black'>
                            Sign in
                        </Link>
                    </p>
                    <button
                        className='px-3 py-2 whitespace-nowrap gradient_btn border-black hover:text-blue-600'
                        onClick={() => {
                            navigate("/account/signup");
                        }}
                    >
                        Get Started
                    </button>
                </div>
            )
          }
      </div>
  );
}
