
import { lazy, useState } from 'react'
import CustomModel from '../../../../utils/CustomModel';
import Login from '../../auth/Login';
import Register from '../../auth/Register';
import ForgetEmail from '../../auth/ForgetEmail';
import OTPVerification from '../../auth/Verification';
const TopHeader = lazy(() => import('./TopHeader'));
const ThirdHeader = lazy(() => import('./ThirdHeader'));
const SecHeader = lazy(() => import('./SecHeader'));



const Header = () => {
    const [open, setOpen] = useState(false)
    const [route, setRoute] = useState("login")
    return (
        <div className='relative'>
            <div className='bg-blue-500 text-white px-3'>
                <TopHeader />
                <SecHeader
                    open={open}
                    setOpen={setOpen}
                />
                <ThirdHeader />
            </div>
            {
                route === "login" &&
                <CustomModel
                    open={open}
                    setOpen={setOpen}
                    component={Login}
                    route={route}
                    setRoute={setRoute}
                />
            }
            {
                route === "register" &&
                <CustomModel
                    open={open}
                    setOpen={setOpen}
                    component={Register}
                    route={route}
                    setRoute={setRoute}
                />
            }
            {
                route === "forgetpassword" &&
                <CustomModel
                    open={open}
                    setOpen={setOpen}
                    component={ForgetEmail}
                    route={route}
                    setRoute={setRoute}
                />
            }
            {
                route === "verification" &&
                <CustomModel
                    open={open}
                    setOpen={setOpen}
                    component={OTPVerification}
                    route={route}
                    setRoute={setRoute}
                />
            }

        </div>
    );
}

export default Header