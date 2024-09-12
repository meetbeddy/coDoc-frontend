import React, { useState } from 'react';
import { MarkButton, BlockButton, ColorButton, HistoryButton } from '../buttons/EditorButtons';
import { HISTORY_BUTTONS, MARK_BUTTONS, COLOR_BUTTONS, BLOCK_BUTTONS } from '../../constants/editorConstants';

export const Toolbar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

  const [activePicker, setActivePicker] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap p-2 mb-0.5 bg-gray-100 border-b border-gray-300">
      {HISTORY_BUTTONS.map((button) => (
        <HistoryButton key={button.format} {...button} />
      ))}
      {MARK_BUTTONS.map((button) => (
        <MarkButton key={button.format} {...button} />
      ))}
      {COLOR_BUTTONS.map((button) => (
        <ColorButton key={button.format} activePicker={activePicker} setActivePicker={setActivePicker}  {...button} />
      ))}
      {BLOCK_BUTTONS.map((button) => (
        <BlockButton key={button.format} {...button} />
      ))}
      {children}
    </div>
  );
};
