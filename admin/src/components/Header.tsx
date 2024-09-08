import { FaUserAlt, FaBell } from "react-icons/fa";

const Header = () => {
    return (
        <div className="w-full mx-auto flex justify-end items-center p-3 bg-slate-100">
            <ul className="flex space-x-6 items-center">
                <li className="relative">
                    <FaBell size={25} className="cursor-pointer" />
                </li>
                <li>
                    <FaUserAlt size={25} className="cursor-pointer" />
                </li>
            </ul>
        </div>
    );
};

export default Header;
