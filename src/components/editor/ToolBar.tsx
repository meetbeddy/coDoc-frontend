import React, { useState } from 'react';
import { MarkButton, BlockButton, ColorButton, HistoryButton } from '../buttons/EditorButtons';
import { HISTORY_BUTTONS, MARK_BUTTONS, COLOR_BUTTONS, BLOCK_BUTTONS } from '../../constants/editorConstants';

export const Toolbar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

  const [activePicker, setActivePicker] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap p-2 mb-0.5 bg-secondary border-b border-primary rounded-t-lg shadow-md">
      {/* History Buttons Group */}
      <div className="flex items-center space-x-2 bg-white p-1 rounded-md shadow-sm">
        {HISTORY_BUTTONS.map((button) => (
          <HistoryButton key={button.format} {...button} />
        ))}
      </div>

      {/* Divider */}
      <div className="mx-2 w-px bg-gray-400 h-full" />

      {/* Mark Buttons Group */}
      <div className="flex items-center space-x-2 bg-white p-1 rounded-md shadow-sm">
        {MARK_BUTTONS.map((button) => (
          <MarkButton key={button.format} {...button} />
        ))}
      </div>

      {/* Divider */}
      <div className="mx-2 w-px bg-gray-400 h-full" />

      {/* Color Buttons Group */}
      <div className="flex items-center space-x-2 bg-white p-1 rounded-md shadow-sm">
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
      <div className="mx-2 w-px bg-gray-400 h-full" />

      {/* Block Buttons Group */}
      <div className="flex items-center space-x-2 bg-white p-1 rounded-md shadow-sm">
        {BLOCK_BUTTONS.map((button) => (
          <BlockButton key={button.format} {...button} />
        ))}
      </div>

      {children}
    </div>
  );
};
