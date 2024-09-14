import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface ToolbarProps {
    openDrawer: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ openDrawer }) => {
    return (
        <header className="bg-gray-700 text-white px-4 py-2 md:px-6 md:py-4 flex flex-wrap items-center justify-between">
            {/* Left Buttons */}
            <div className="flex flex-wrap items-center space-x-2 md:space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 md:px-4 md:py-2 rounded text-sm md:text-base">
                    Save
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 px-3 py-1 md:px-4 md:py-2 rounded text-sm md:text-base">
                    Share
                </button>
            </div>

            {/* Right Section with Profile Image */}
            <div className="flex items-center space-x-2 md:space-x-4 mt-2 md:mt-0">
                {/* Profile Dropdown or Clickable */}
                <button className="focus:outline-none" onClick={openDrawer}>
                    <FaUserCircle className="w-8 h-8 md:w-10 md:h-10 text-gray-300 rounded-full hover:text-white" />
                </button>
            </div>
        </header>
    );
};

export default Toolbar;
