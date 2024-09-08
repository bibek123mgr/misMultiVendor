import React, { ChangeEvent, FC, useEffect, useState, } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaFacebook, FaGithub } from 'react-icons/fa6';
import Divider from '../../Divider';
import { login } from '../../../store/auth/authApi';
import { useAppDispatch } from '../../../store/hook';
import { STATUSES } from '../../../type/TypeDef';
import { setStatus } from '../../../store/auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

type Props = {
    setOpen: (open: boolean) => void;
    setRoute: (route: string) => void;
}

const Login: FC<Props> = ({ setOpen, setRoute }) => {
    const dispatch = useAppDispatch()
    const { status } = useSelector((store: RootState) => store.auth)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            dispatch(login(data))
            setOpen(false);
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        if (status === STATUSES.SUCCESS) {
            dispatch(setStatus(STATUSES.IDEL))
        }
    }, [status])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className='py-4'>
            <h1 className='text-black font-bold text-3xl'>Sign in</h1>
            <p className='text-gray-400'>
                Sign in to your account and explore a world of possibilities. Your journey begins here.
            </p>
            <div className='mt-3'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className='block text-black text-lg font-semibold'>Email Address</label>
                        <div className='mt-1 flex border border-gray-300 items-center px-2 py-3 rounded-md'>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                autoComplete="current-email"
                                placeholder='example@gmail.com'
                                autoFocus
                                className='w-full outline-none border-none bg-transparent text-black'
                            />
                        </div>
                    </div>
                    <div className='mt-1'>
                        <label htmlFor="password" className='block text-black text-lg font-semibold'>Password</label>
                        <div className='mt-1 flex border border-gray-300 items-center px-2 py-3 rounded-md'>
                            <input
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder='*******'
                                autoComplete="current-password"
                                className='w-full outline-none border-none bg-transparent text-black'
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className='ml-2 text-gray-500'
                            >
                                {passwordVisible ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                            </button>
                        </div>
                    </div>

                    <div className='mt-3 flex items-center justify-between'>
                        <div className='flex items-center'>
                            <input
                                type="checkbox"
                                name='check'
                                className='h-5 w-5 border border-gray-300 rounded checked:accent-gray-100'
                            />
                            <span className='ml-2 text-gray-700 text-[16px]'>Remember me</span>
                        </div>
                        <button
                            onClick={() => setRoute('forgetpassword')}
                            className='text-[16px] text-gray-500 hover:text-blue-500 hover:underline transition-colors'
                        >
                            Forgot your password?
                        </button>
                    </div>
                    <div className='mt-3'>
                        <button type="submit" className='w-full bg-blue-500 text-white py-3 rounded'>
                            Sign in
                        </button>
                    </div>
                </form>
                <Divider title='Or' />
                <div className='flex items-center justify-center gap-4 my-1'>
                    <FaFacebook size={25} className='cursor-pointer text-blue-500' />
                    <FaGithub size={25} className='cursor-pointer text-black' />
                    <button className='h-[30px] w-[30px]'><img src={'/google.png'} alt='google' width={100} height={100} /></button>
                </div>
                <div className='text-center mt-4 text-sm'>
                    <span className='text-black text-center'>Don't have an account? <button className='hover:text-blue-500 hover:underline' onClick={() => setRoute('register')}>Register here</button></span>
                </div>
            </div>
        </div>
    );
}

export default Login;
