import { FC, useState } from 'react';

import { BiCard, BiSearch, BiUser } from 'react-icons/bi';
import { HiHeart } from 'react-icons/hi';
import { IoMenu } from "react-icons/io5";
import { PiPhone } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import isAuth from '../../../../utils/isAuth';

interface Prop {
    open: boolean,
    setOpen: (open: boolean) => void

}

const SecHeader: FC<Prop> = ({ open, setOpen }) => {
    const isAuthenticated = isAuth()
    const [sideOpen, setSideOpen] = useState(false);
    const categories = [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Fashion" },
        { id: 3, name: "Home & Kitchen" },
        { id: 4, name: "Health & Beauty" },
        { id: 5, name: "Toys & Games" },
        { id: 6, name: "Sports & Outdoors" },
        { id: 7, name: "Automotive" },
        { id: 8, name: "Books & Stationery" },
        { id: 9, name: "Groceries & Gourmet Food" },
        { id: 10, name: "Pet Supplies" },
        { id: 11, name: "Furniture" },
        { id: 12, name: "DIY & Tools" },
    ];

    const handleToggleSide = () => {
        setSideOpen(!sideOpen);
    }
    const handleClose = (e: any) => {
        if (e.target.id === 'mobilenav') {
            setSideOpen(false);
        }
    };
    return (
        <>
            <div className="w-full h-16 bg-blue-500">
                <div className="max-w-screen-xl flex justify-between items-center mx-auto h-full px-3 lg:px-0">
                    <div className='flex gap-2'>
                        <button
                            className='block md:hidden'
                            onClick={handleToggleSide}>
                            <IoMenu size={25} />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-center">Logo.</h1>
                        </div>
                    </div>
                    <div className="md:flex hidden flex-grow items-center bg-gray-100 rounded-md shadow-md mx-4 lg:mx-10">
                        <select
                            className="bg-gray-100 text-black p-2 rounded-l-md border-r-2 border-gray-300 focus:outline-none"
                        >
                            {categories.map((item, index) => (
                                <option value={item.name} key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <div className="flex items-center w-full bg-white rounded-r-md shadow-inner px-1">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="flex-grow bg-transparent focus:outline-none text-black p-2"
                            />
                            <BiSearch size={25} className="text-black cursor-pointer" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2">
                            <PiPhone size={25} />
                            <p className="flex flex-col text-sm">
                                <span>Need Help?</span>
                                <span className="font-semibold">+001 125 145 789</span>
                            </p>
                        </div>
                        {
                            isAuthenticated ? <Link to={'/profile'}><BiUser size={25} /></Link> :
                                <button onClick={() => setOpen(!open)}><BiUser size={25} /></button>

                        }
                        <HiHeart size={25} />
                        <Link to="/cart"><BiCard size={25} /></Link>
                    </div>
                </div>

                {/* Mobile sidebar */}
                {sideOpen && (
                    <div
                        id='mobilenav'
                        onClick={handleClose}
                        className='w-full min-h-[100vh] bg-gray-50 bg-opacity-50 fixed top-0 left-0 z-50 md:hidden block'>
                        <div className='max-w-[300px] bg-black py-5 pl-3 h-[100vh] '>
                            I am now shown
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SecHeader;
