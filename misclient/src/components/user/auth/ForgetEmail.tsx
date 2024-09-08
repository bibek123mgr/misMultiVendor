import React, { FC, useState } from 'react';

type Props = {
    setOpen: (open: boolean) => void;
    setRoute: (route: string) => void;
};

const ForgetEmail: FC<Props> = ({ setOpen, setRoute }) => {
    const [email, setEmail] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email); // Logs the email to the console
        // Handle form submission logic here
    };

    return (
        <div className='py-6'>
            <h1 className='text-black font-bold text-3xl'>Forgot Password?</h1>
            <p className='text-gray-500 mb-5'>
                Enter the email address associated with your account, and we will send an OTP verification code.
            </p>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor="email" className='block text-black text-lg font-semibold mb-1'>
                        Email Address
                    </label>
                    <div className='flex border border-gray-300 rounded-md'>
                        <input
                            type="email"
                            id="email"
                            placeholder='example@gmail.com'
                            value={email}
                            onChange={handleChange}
                            className='w-full px-3 py-2 border-none rounded-md text-black outline-none bg-white'
                            aria-label="Email Address"
                            required
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className='w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700'
                        onClick={() => setRoute('verification')}

                    >
                        Send Reset OTP
                    </button>
                </div>
            </form>
            <div className='mt-4 text-center'>
                <button
                    className='text-blue-600 hover:text-blue-700 underline'
                    onClick={() => setRoute('login')}
                >
                    Return to Sign In
                </button>
            </div>
        </div>
    );
};

export default ForgetEmail;
