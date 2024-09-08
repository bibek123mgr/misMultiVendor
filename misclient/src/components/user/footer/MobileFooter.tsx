import React from 'react';
import { FaHome, FaList, FaShoppingCart, FaUser, FaBox, FaSearch, FaStoreSlash } from 'react-icons/fa';

type Props = {};

const MobileFooter: React.FC<Props> = () => {
    const links = [
        {
            name: 'Home',
            link: '/',
            icon: <FaHome size={25} />
        },
        {
            name: 'Categories',
            link: '/categories',
            icon: <FaList size={25} />
        },
        {
            name: 'Cart',
            link: '/cart',
            icon: <FaShoppingCart size={25} />
        },
        // {
        //     name: 'Search',
        //     link: '/order',
        //     icon: <FaSearch size={25} />
        // },
        {
            name: 'Stores',
            link: '/store',
            icon: <FaStoreSlash size={25} />
        }
    ];

    return (
        <div className="bg-gray-100 py-2 fixed bottom-0 left-0 w-full border-t border-gray-300 z-50 block sm:hidden">
            <ul className="flex justify-around list-none p-0 m-0">
                {links.map((link, index) => (
                    <li key={index} className="flex flex-col items-center text-blue-500">
                        <a href={link.link} className="flex flex-col items-center">
                            {link.icon}
                            <span className="text-xs mt-1">{link.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MobileFooter;
