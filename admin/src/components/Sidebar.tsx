import { FaUserCircle, FaChartPie, FaTags, FaPlus, FaUsers, FaThList, FaStore, FaCog, FaSignOutAlt } from 'react-icons/fa';

const menuItems = [
    { name: 'Dashboard', icon: <FaUserCircle className="text-xl" />, link: '/dashboard' },
    { name: 'Store', icon: <FaStore className="text-xl" />, link: '/dashboard/store' },
    { name: 'Analytics', icon: <FaChartPie className="text-xl" />, link: '/dashboard/analytics' },
    { name: 'Category', icon: <FaThList className="text-xl" />, link: '/dashboard/category' },
    { name: 'Product', icon: <FaThList className="text-xl" />, link: '/dashboard/product' },

    { name: 'Add Category', icon: <FaPlus className="text-xl" />, link: '/dashboard/add-category' },
    { name: 'Brand', icon: <FaTags className="text-xl" />, link: '/dashboard/brand' },
    { name: 'Add Brand', icon: <FaPlus className="text-xl" />, link: '/dashboard/add-brand' },
    { name: 'Treasures', icon: <FaUsers className="text-xl" />, link: '/dashboard/treasures' },
];

const settingsItems = [
    { name: 'Settings', icon: <FaCog className="text-xl" />, link: '#' },
    { name: 'Logout', icon: <FaSignOutAlt className="text-xl" />, link: '#', className: 'text-red-600 hover:bg-red-100' },
];

const Sidebar = () => {
    return (
        <>

            <div className="relative">
                <section
                    id="sidebar"
                    className="fixed top-0 left-0 h-full text-gray-800 transition-all duration-300 ease-in-out z-50 overflow-hidden"
                >
                    <a href="#" className="flex items-center p-4 text-blue-600 font-bold text-lg">
                        <FaUserCircle className="text-2xl" />
                        <span className="ml-2">HI,admin</span>
                    </a>
                    <ul className="mt-12">
                        {menuItems.map((item, index) => (
                            <li key={index} className="mb-2">
                                <a href={item.link} className="flex items-center p-2 hover:bg-gray-300 text-gray-800">
                                    {item.icon}
                                    <span className="ml-2">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {settingsItems.map((item, index) => (
                            <li key={index} className="mb-2">
                                <a href={item.link} className={`flex items-center p-2 ${item.className || 'text-gray-800'} hover:bg-gray-300`}>
                                    {item.icon}
                                    <span className="ml-2">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    );
};

export default Sidebar;
