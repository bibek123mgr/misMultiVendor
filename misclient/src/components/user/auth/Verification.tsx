import React, { FC, useState, useRef, useEffect } from 'react';
import { useAppDispatch } from '../../../store/hook';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { STATUSES } from '../../../type/TypeDef';
import { setStatus } from '../../../store/auth/authSlice';
import { verifyMyAccount } from '../../../store/auth/authApi';


type Props = {
    setOpen: (open: boolean) => void;
    setRoute: (route: string) => void;
};

const OTPVerification: FC<Props> = ({ setOpen, setRoute }) => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Ensures only one digit per box
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Backspace' && index > 0 && !otp[index]) {
            inputRefs.current[index - 1]?.focus();
        }
    };
    const dispatch = useAppDispatch()
    const { status } = useSelector((store: RootState) => store.auth)

    useEffect(() => {
        if (status === STATUSES.SUCCESS) {
            dispatch(setStatus(STATUSES.IDEL))
            setOpen(false)
            setRoute('login')
        }
    }, [status])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');
        try {
            await dispatch(verifyMyAccount(otpCode));
        } catch (error) {
            console.error('Error verifying account:', error);
        }
    };

    return (
        <div className='py-4'>
            <div>
                <h1 className='text-black font-bold text-3xl text-center'>OTP Verification</h1>
                <p className='text-gray-400 text-center'>
                    Please enter the 6-digit verification code sent to your email.
                </p>
                <div className='mt-5'>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                        <div className='flex space-x-1'>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    className='w-12 h-12 text-center border border-gray-300 rounded-md outline-none text-black text-lg bg-white'
                                />
                            ))}
                        </div>
                        <div className='mt-3 w-full'>
                            <button type="submit" className='w-full bg-blue-500 text-white py-3 rounded'>
                                Verify OTP
                            </button>
                        </div>
                    </form>
                    <div className='mt-5 text-center text-gray-400'>
                        Didn't receive the OTP?
                        <button className='hover:text-blue-500 hover:underline text-black mx-1'>
                            RESEND OTP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
