import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FaFacebook, FaGithub } from 'react-icons/fa6'
import Divider from '../../Divider'
import { useAppDispatch } from '../../../store/hook'
import { register } from '../../../store/auth/authApi'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { STATUSES } from '../../../type/TypeDef'
import { setStatus } from '../../../store/auth/authSlice'

type Props = {
    setOpen: (open: boolean) => void
    setRoute: (route: string) => void
}

const Register: FC<Props> = ({ setOpen, setRoute }) => {
    const dispatch = useAppDispatch()
    const { status } = useSelector((store: RootState) => store.auth)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setData({
            ...data,
            [name]: value
        })
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(register(data))
        // Handle form submission
    };

    useEffect(() => {
        if (status === STATUSES.SUCCESS) {
            dispatch(setStatus(STATUSES.IDEL))
            setRoute('verification')
        }
    }, [status])


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <div className='py-4'>
            <h1 className='text-black font-bold text-3xl'>Register</h1>
            <p className='text-gray-400'>
                Sign in to your account and explore a world of possibilities. Your journey begins here.
            </p>
            <div className='mt-3'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className='block text-black text-lg font-semibold'>User name</label>
                        <div className='mt-1 flex border border-gray-300 items-center px-2 py-3 rounded-md'>
                            <input
                                type="text"
                                name='name'
                                onChange={handleChange}
                                value={data.name}
                                placeholder='jhon doe'
                                className='w-full outline-none border-none bg-transparent text-black'
                            />
                        </div>
                    </div>
                    <div className='mt-1'>
                        <label htmlFor="email" className='block text-black text-lg font-semibold'>Email Address</label>
                        <div className='mt-1 flex border border-gray-300 items-center px-2 py-3 rounded-md'>
                            <input
                                type="email"
                                name='email'
                                onChange={handleChange}
                                value={data.email}
                                placeholder='example@gmail.com'
                                className='w-full outline-none border-none bg-transparent text-black'
                            />
                        </div>
                    </div>
                    <div className='mt-1'>
                        <label htmlFor="password" className='block text-black text-lg font-semibold'>Password</label>
                        <div className='mt-1 flex border border-gray-300 items-center px-2 py-3 rounded-md'>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                name='password'
                                onChange={handleChange}
                                value={data.password}
                                placeholder='*******'
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
                    <button type="submit" className='w-full bg-blue-500 text-white py-3 rounded mt-3'>
                        Sign in
                    </button>
                </form>
                <Divider title='Or' />
                <div className='flex items-center justify-center gap-4 my-1'>
                    <FaFacebook size={25} className='cursor-pointer text-blue-500' />
                    <FaGithub size={25} className='cursor-pointer text-black' />
                    <button className='h-[30px] w-[30px]'><img src={'/google.png'} alt='google' width={100} height={100}></img></button>
                </div>
                <div className='text-center mt-4 text-sm'>
                    <span className='text-black text-center'>Already have an Account? <button className='hover:text-blue-500 hover:underline' onClick={() => setRoute('login')}>Sign in</button></span>
                </div>
            </div>
        </div>
    )
}

export default Register