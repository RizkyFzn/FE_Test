import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { loginUser } from '../../store/auth';
import { Logo, Tol } from '../../assets';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }))
          .unwrap()
          .then(() => {
            navigate('/dashboard');
          })
          .catch((err) => {
            console.error('Login failed:', err);
          });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    };

    return (
        <>
            <div className='h-screen w-screen flex flex-row'>
                <div className='w-1/2 flex flex-col gap-8 items-center bg-slate justify-center'>
                    <div className='w-full flex justify-center text-center'>
                        <img src={Logo} alt="" className='w-60' />
                    </div>
                    <div className='flex flex-col w-1/3 gap-5'>
                        <div className="relative">
                            <input 
                                type="text" 
                                id="username" 
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" "
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleKeyDown}
                                required
                            />
                            <label htmlFor="username" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Username</label>
                        </div>
                        <div className="relative">
                            <input 
                                type="password" 
                                id="pass" 
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                required
                            />
                            <label htmlFor="pass" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                        </div>

                        <button onClick={handleLogin} className='bg-blue-600 rounded-md py-2 text-white font-semibold'>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                        {error && <p className='text-red-500'>{error}</p>}
                    </div>
                </div>
                <div className='relative w-1/2 bg-blue-800 flex justify-center py-20 -z-20 items-start'>
                    <p className='text-4xl font-bold text-white text-center'>
                        Toll Collection Management <br/>Jasa Marga
                    </p>
                    <img src={Tol} alt="" className='w-full h-full absolute bottom-0 -z-10 opacity-10 object-cover' />
                </div>
            </div>
        </>
    );
}

export default Login;
