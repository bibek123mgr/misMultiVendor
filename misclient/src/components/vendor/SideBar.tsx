import { FaTachometerAlt, FaProductHunt, FaStore, FaListAlt } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sideComponents = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: <FaTachometerAlt size={25} />,
    },
    {
      name: 'Products',
      link: '/dashboard/product',
      icon: <FaProductHunt size={25} />,
    },
    {
      name: 'Store Details',
      link: '/dashboard/store-detail',
      icon: <FaStore size={25} />,
    },
    {
      name: 'Orders',
      link: '/dashboard/order',
      icon: <FaListAlt size={25} />,
    },
    {
      name: 'Add Product',
      link: '/dashboard/add-product',
      icon: <FaListAlt size={25} />,
    },
    {
      name: 'Return to Home',
      link: '/',
      icon: <FaListAlt size={25} />,
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-controls="sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <MdDashboard className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 bg-gray-800 text-white`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 pt-10">
          <ul className="space-y-2 font-medium">
            {sideComponents.map((item, index) => (
              <li key={index} className="flex items-center">
                <Link to={item.link} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700">
                  {item.icon}
                  {/* Show text only on larger screens */}
                  <span className={`ms-3 hidden sm:inline`}>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
