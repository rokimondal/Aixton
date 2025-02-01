import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios'
import { userContext } from '../context/user.context';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { setUser } = useContext(userContext);

    const submitHandler = (e) => {
        e.preventDefault();
        const data = { email, password };
        console.log(data);
        axios.post('/users/login', { email, password })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user)

                navigate('/')
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white outline-none"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4 relative ">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white outline-none"
                            placeholder="Enter your password"
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-7 mr-1"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <FaEyeSlash className='text-lg text-gray-400' /> : <FaEye className='text-lg text-gray-400' />}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className='text-sm text-gray-400'>Don't have an account? <Link to="/register" className="text-gray-300 hover:text-gray-200">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;