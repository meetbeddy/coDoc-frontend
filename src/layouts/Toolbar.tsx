import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface ToolbarProps {
    openDrawer: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ openDrawer }) => {
    return (
        <header className="bg-gray-700 text-white px-6 py-4 flex items-center justify-between">
            {/* Left Buttons */}
            <div className="flex items-center space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Save</button>
                <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Share</button>
            </div>

            {/* Right Section with Profile Image */}
            <div className="flex items-center space-x-4">
                {/* Profile Dropdown or Clickable */}
                <button className="focus:outline-none" onClick={openDrawer}>
                    <FaUserCircle className="w-10 h-10 text-gray-300 rounded-full hover:text-white" />
                </button>
            </div>
        </header>
    );
};

export default Toolbar;
