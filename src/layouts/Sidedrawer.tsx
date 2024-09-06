import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, children }) => {
    return (
        <div
            className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white shadow-lg transform duration-300 ease-in-out 
                        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="flex items-center justify-between px-4 py-3 bg-gray-700">
                <h2 className="text-lg font-semibold">Drawer</h2>
                <button onClick={onClose}>
                    <FaTimes className="text-gray-300 w-5 h-5 hover:text-white" />
                </button>
            </div>

            {/* Drawer Content */}
            <div className="p-4">
                {children}
            </div>
        </div>
    );
};

export default SideDrawer;
