import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regGmail, regPassword } from '../../constants/regex';

import Navbar from '../Navbar/Navbar';

import { signup } from '../../actions/auth';
import { AppDispatch } from '../../store/store';
import { Email, Password } from '@mui/icons-material';

const errorInputClassName = 'w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-red-500 outline-none focus:border-red-300';
const inputClassName = 'w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export default function Signup() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch<AppDispatch>();
    const [showPassword, setShowPassword] = useState<boolean>();
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [passwordValid, setPasswordValid] = useState<boolean>(true);
    const [formDataValid, setFormDataValid] = useState<boolean>(true);
    const [error, setError] = useState<string | null>('');

    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(showPassword => !showPassword);
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(showConfirmPassword => !showConfirmPassword);
    }

    const getPasswordType = (password : boolean) => {
        return password ? 'text' : 'password';
    }

    
    const handleSubmit = () => {
        validateFormData();
        if(formDataValid) {
            dispatch(signup(formData, () => {navigate('/listener')})).then(result => setError(result));
        }
    }

    const handleChange = (e : any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validateFormData = () => {
        if(formData.confirmPassword === '' || formData.password === '' || formData.firstName === '' || formData.lastName === '' || formData.email === '') {
            setFormDataValid(false);
        } else {
            setFormDataValid(true);
        }
    }

    const validateEmail = (email : string) => {
        if(!regGmail.test(email) && email.length != 0) {
            setEmailValid(false);
        } else {
            setEmailValid(true);
        }
    }

    const validatePassword = (password : string) => {
        if(!regPassword.test(password) && password.length != 0) {
            setPasswordValid(false);
        } else {
            setPasswordValid(true);
        }
    }

    const validatePasswordMatch = (confirmPassword : string) => {
        if(confirmPassword != formData.password && formData.password.length != 0 || formData.confirmPassword.length != 0) {
            setPasswordMatch(false);
        } else {
            setPasswordMatch(true);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
                <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-[1000px]">
                    <div className="md:flex w-full">
                        <div className="flex items-center justify-center w-full bg-[#22333e]">
                            <img src="../../../public/signupFormBg.png" alt="signup form"/>    
                        </div>
                        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                            <div className="text-center mb-10">
                                <h1 className="font-bold text-3xl text-gray-900">SIGN UP</h1>
                                <p>Enter your information to register</p>
                        </div>
                            <div>
                                <div className='flex gap-4'>
                                    <div className="w-full mb-5">
                                        <label htmlFor="" className="text-xs font-semibold px-1">Firstname</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input onChange={handleChange} name="firstName" type="name" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="John" />
                                        </div>
                                    </div>
                                    <div className="w-full mb-5">
                                        <label htmlFor="" className="text-xs font-semibold px-1">Lastname</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input onChange={handleChange} name="lastName" type="name" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Smith" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input onChange={(event : any) => { handleChange(event); validateEmail(event.target.value); }} name="email" type="email" className={emailValid ? inputClassName : errorInputClassName} placeholder="johnsmith@example.com" />
                                        </div>
                                            {!emailValid ? <p className='ml-2 text-red-500 italic'><b>Email is invalid</b></p> : <></>}
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-12">
                                        <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                                <input onChange={(event : any) => { handleChange(event); validatePassword(event.target.value); }} name="password" type={getPasswordType(showPassword!)} className={passwordValid ? inputClassName : errorInputClassName} placeholder="************" />
                                                <button className='btn btn-outline-primary' onClick={toggleShowPassword}>
                                                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                                </button>
                                            </div>
                                            {!passwordValid ? 
                                            <div>
                                                <p className='ml-2 text-red-500 italic'><b>Password is invalid</b></p>
                                                <p className='ml-2 text-gray-400 italic'>Please ensure that your password have:</p>
                                                <p className='ml-2 text-gray-400 italic'>At least 8 characters</p>
                                                <p className='ml-2 text-gray-400 italic'>At least 1 uppercase letter(A-Z)</p>
                                                <p className='ml-2 text-gray-400 italic'>At least 1 lowercase letter(a-z)</p>
                                                <p className='ml-2 text-gray-400 italic'>At least 1 digit(1-9)</p>
                                                <p className='ml-2 text-gray-400 italic'>At least 1 special character(#, @, _, -, etc...)</p>
                                            </div>
                                             :
                                              <></>}
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-12">
                                        <label htmlFor="" className="text-xs font-semibold px-1">Confirm Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                                <input onChange={(event : any) => { handleChange(event); validatePasswordMatch(event.target.value); }} name="confirmPassword" type={getPasswordType(showConfirmPassword!)} className={passwordValid ? inputClassName : errorInputClassName} placeholder="************" />
                                                <button className='btn btn-outline-primary' onClick={toggleShowConfirmPassword}>
                                                    {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                                </button>
                                            </div>
                                            {!passwordMatch ? <p className='ml-2 text-red-500 italic'><b>Passwords are not matching</b></p> : <></>}
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button onClick={handleSubmit} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Submit</button>
                                        {!formDataValid ? 
                                            <div>
                                                <p className='ml-2 text-red-500 italic'><b>Some form input's are empty</b></p> 
                                                <p className='ml-2 text-gray-400 italic'>Please fill this input's and click submit</p>
                                            </div>
                                            :
                                            error ? 
                                            <div>
                                                <p className='ml-2 text-red-500 italic'><b>{error}</b></p> 
                                            </div> 
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>
                                <div className='flex gap-1 justify-center text-[15px]'>
                                    <p>If you already have an account you can</p>
                                    <Link to={'/account/login'} className="text-blue-500 hover:underline">Sign in</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}