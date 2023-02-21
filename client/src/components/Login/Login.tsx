import React, { useState, useEffect } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../Navbar/Navbar';

import { signin } from '../../actions/auth';
import { AppDispatch } from '../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_URL } from '../../api/config';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export default function Login() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch<AppDispatch>();
    const [showPassword, setShowPassword] = useState<boolean>();
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(showPassword => !showPassword);
    }

    const getPasswordType = () => {
        return showPassword ? 'text' : 'password';
    }

    const handleSubmit = () => {
        dispatch(signin(formData, () => {navigate('/verifyEmail');})).then(result => setError(result));
    }

    const handleChange = (e : any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
 

  return (
    <div>
        <Navbar />
        <div className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-[1000px]">
                <div className="md:flex w-full">
                    <div className="flex items-center justify-center w-full bg-[#cccccd]">
                        <img src="../../../public/loginFormBg.png" alt="login form"/>    
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900">SIGN IN</h1>
                            <p>Enter your information to login</p>
                        </div>
                        <div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                        <input onChange={handleChange} name="email" type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@example.com" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-12">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                        <input onChange={handleChange} name="password" type={getPasswordType()} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />
                                        <button className='btn btn-outline-primary' onClick={toggleShowPassword}>
                                            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <button onClick={handleSubmit} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Submit</button>
                                    {error 
                                        ? 
                                        <div>
                                            <p className='ml-2 text-red-500 italic'><b>{error}</b></p> 
                                        </div> 
                                        :
                                        <></>
                                    }
                                </div>
                            </div>
                            <div className='flex gap-1 justify-center text-[15px]'>
                                <p>If you haven't account you always can</p>
                                <Link to={'/account/signup'} className="text-blue-500 hover:underline">Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
