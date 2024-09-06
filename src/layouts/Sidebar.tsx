import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStickyNote, FaClock, FaStar, FaFolder, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <div className="flex h-screen">
            <aside
                className={`bg-gray-100 text-gray-800 h-screen p-5 pt-8 relative duration-300 ${isOpen ? 'w-64' : 'w-20'}`}
            >
                <button
                    className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 bg-blue-400 text-white rounded-full 
                                flex items-center justify-center transition-transform duration-300 ease-in-out
                                ${!isOpen ? 'transform rotate-180' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                <div className="flex flex-col justify-start">
                    <h1 className={`text-blue-400 font-bold text-2xl duration-300 ${!isOpen && 'scale-0'}`}>
                        coDoc
                    </h1>

                    <nav className="mt-10">
                        {[
                            { to: "/add-note", icon: FaStickyNote, label: "Add Note" },
                            { to: "/recent", icon: FaClock, label: "Recent" },
                            { to: "/starred", icon: FaStar, label: "Starred" },
                            { to: "/library", icon: FaFolder, label: "Library" },
                        ].map((item, index) => (
                            <Link
                                key={index}
                                to={item.to}
                                className={`flex items-center gap-4 text-gray-800 p-3 rounded-md transition-all duration-300 ease-in-out
                                            ${isOpen ? 'hover:bg-blue-50' : 'hover:bg-blue-50 justify-center'}`}
                            >
                                <item.icon className={`w-6 h-6 ${!isOpen && 'w-8 h-8 text-blue-400'}`} />
                                <span className={`${!isOpen && 'hidden'} origin-left duration-200 whitespace-nowrap`}>
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
