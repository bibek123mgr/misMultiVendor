import { useEffect, useState } from 'react'
import Order from '../components/user/profile/Order'
import { Link, useNavigate } from 'react-router-dom'
import UserProfile from '../components/user/profile/UserProfile'
import { useAppDispatch } from '../store/hook'
import { logOut } from '../store/auth/authApi'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { fetchOrders } from '../store/order/orderApi'
import SingleOrder from '../components/user/profile/SingleOrder'

const Profile = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchOrders())
    }, [])
    const { data: user }: { data: any } = useSelector((store: RootState) => store.auth)
    const [header, setHeader] = useState('Profile')
    const navigate = useNavigate()
    const headerList = [
        "Profile", "Orders"
    ]
    const handleLogOut = async () => {
        await dispatch(logOut())
        navigate('/')
    }
    return (
        <div className="bg-gray-100 w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <aside className="py-4 md:w-1/3 lg:w-1/4 block">
                <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
                    <h2 className="pl-3 mb-4 text-2xl font-semibold">{header}</h2>
                    {headerList.map((item, index) => (
                        <button
                            onClick={() => setHeader(item)}
                            key={index}
                            className={`flex items-center px-3 py-2.5 font-bold ${header === item && 'text-indigo-900 border rounded-lg'} hover:text-indigo-900 hover:border rounded-lg`} >
                            {item}
                        </button>
                    ))}
                    {user.role === 'vendor' && <Link to="/dashboard" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-lg">
                        Dashboard
                    </Link>}
                    <button className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-lg"
                        onClick={handleLogOut}>
                        Logout
                    </button>
                </div>
            </aside>
            <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4 ">
                {header === 'Profile' && <UserProfile />}
                {header === 'Orders' && <Order setHeader={setHeader} />}
                {header === 'Order details' && <SingleOrder />}
            </main>
        </div>
    )
}

export default Profile