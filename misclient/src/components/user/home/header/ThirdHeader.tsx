import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const ThirdHeader: React.FC<Props> = () => {
    const navigationItems = [
        { id: 1, name: "Home", link: "/" },
        { id: 2, name: "Blog", link: "/blog" },
        { id: 3, name: "About", link: "/about" },
        { id: 4, name: "Services", link: "/services" },
        {
            id: 5,
            name: "Stores",
            link: '/store'

        },
    ];

    return (
        <div className='w-full h-16 shadow-md bg-transparent hidden md:block'>
            <div className='max-w-screen-xl flex justify-between m-auto items-center h-full'>
                <div className='flex items-center gap-10'>
                    {navigationItems.map((item, index) => {
                        return (
                            <Link
                                to={item.link}
                                key={index}
                                className='text-gray-700 hover:text-gray-900 transition-colors duration-200'
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
                <Link
                    to={'/become-seller'}
                    className='bg-pink-700 text-white font-semibold rounded-md p-2 px-4 shadow-lg hover:bg-pink-600 transition-colors duration-200 ease-in-out'
                >
                    Become a Seller
                </Link>            </div>
        </div>
    );
};

export default ThirdHeader;
