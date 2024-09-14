import React, { useState } from 'react';
import { MarkButton, BlockButton, ColorButton, HistoryButton } from '../buttons/EditorButtons';
import { HISTORY_BUTTONS, MARK_BUTTONS, COLOR_BUTTONS, BLOCK_BUTTONS } from '../../constants/editorConstants';
import { FaEllipsisV } from 'react-icons/fa';

export const Toolbar: React.FC = () => {
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const [activePicker, setActivePicker] = useState<string | null>(null);

  const handleOverflowToggle = () => {
    setIsOverflowOpen(!isOverflowOpen);
  };

  return (
    <div className="relative flex flex-wrap items-center w-full bg-gray-100 border-b border-gray-300 p-2">
      <div className="flex items-center space-x-2 overflow-x-auto">
        {/* History Buttons Group */}
        <div className="flex items-center space-x-1 bg-white p-1 rounded-md shadow-sm">
          {HISTORY_BUTTONS.map((button) => (
            <HistoryButton key={button.format} {...button} />
          ))}
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-400 h-6 mx-2" />

        {/* Mark Buttons Group */}
        <div className="flex items-center space-x-1 bg-white p-1 rounded-md shadow-sm">
          {MARK_BUTTONS.map((button) => (
            <MarkButton key={button.format} {...button} />
          ))}
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-400 h-6 mx-2" />

        {/* Color Buttons Group */}
        <div className="flex items-center space-x-1 bg-white p-1 rounded-md shadow-sm">
          {COLOR_BUTTONS.map((button) => (
            <ColorButton
              key={button.format}
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              {...button}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-400 h-6 mx-2" />

        {/* Block Buttons Group */}
        <div className="flex items-center space-x-1 bg-white p-1 rounded-md shadow-sm">
          {BLOCK_BUTTONS.map((button) => (
            <BlockButton key={button.format} {...button} />
          ))}
        </div>
      </div>

      {/* Overflow Menu Button */}
      <button
        onClick={handleOverflowToggle}
        className="absolute right-2 top-2 p-2 text-gray-600 hover:text-blue-500 transition-colors duration-200"
      >
        <FaEllipsisV />
      </button>

      {/* Overflow Menu */}
      {isOverflowOpen && (
        <div className="absolute right-2 top-10 bg-white border border-gray-300 rounded-md shadow-md z-10">
          <div className="p-2">
            <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Extra Tool 1</button>
            <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Extra Tool 2</button>
          </div>
        </div>
      )}
    </div>
  );
};
