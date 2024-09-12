import React, { useRef, useEffect } from 'react';
import { useSlate } from 'slate-react';
import { Button } from './MainButton';
import { toggleMark, toggleBlock, toggleColor, isMarkActive, isBlockActive } from '../../utils/editorUtils';
import { COLORS } from '../../constants/editorConstants';
import { CustomElement, CustomText } from '../../types/editorTypes';
import { IconType } from 'react-icons';

export const MarkButton: React.FC<{ format: keyof Omit<CustomText, 'text'>; icon: React.ComponentType; shortcut?: string }> = ({ format, icon: Icon, shortcut }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      tooltip={shortcut ? `${format} (${shortcut})` : undefined}
    >
      <Icon />
    </Button>
  );
};

export const BlockButton: React.FC<{ format: CustomElement['type']; icon: React.ComponentType; iconProps?: object; shortcut?: string }> = ({ format, icon: Icon, iconProps, shortcut }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      tooltip={shortcut ? `${format} (${shortcut})` : undefined}
    >
      <Icon {...iconProps} />
    </Button>
  );
};

export const ColorButton: React.FC<{
  format: 'color' | 'backgroundColor';
  icon: IconType;
  activePicker: string | null;
  setActivePicker: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ format, icon, activePicker, setActivePicker }) => {
  const editor = useSlate();
  const pickerRef = useRef<HTMLDivElement>(null);

  const isPickerOpen = activePicker === format;

  const Icon = icon

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setActivePicker('');
      }
    };

    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen, setActivePicker]);

  return (
    <div className="relative">
      <Button
        onMouseDown={(event) => {
          event.preventDefault();
          event.stopPropagation(); // Prevent any unintended propagation

          // Toggle the color picker
          setActivePicker(isPickerOpen ? null : format);
        }}
        tooltip={format === 'color' ? 'Text Color' : 'Background Color'}
      >
        <Icon />
      </Button>

      {isPickerOpen && (
        <div
          ref={pickerRef}
          className="absolute w-44 z-10 p-2 bg-white border border-gray-300 rounded shadow-lg"
          style={{ top: '100%', left: '0' }}
          onMouseDown={(e) => e.stopPropagation()} // Prevent clicks inside the picker from closing it
        >
          <div className="grid grid-cols-4 gap-1">
            {COLORS.map((color) => (
              <div
                key={color}
                className="w-6 h-6 cursor-pointer border border-gray-300 rounded-full"
                style={{ backgroundColor: color }}
                onMouseDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation(); // Prevent closing the picker
                  toggleColor(editor, format, color);
                  setActivePicker(null); // Close picker after selection
                }}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export const HistoryButton: React.FC<{ format: 'undo' | 'redo'; icon: React.ComponentType; shortcut?: string }> = ({ format, icon: Icon, shortcut }) => {
  const editor = useSlate();
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        if (format === 'undo') editor.undo();
        else editor.redo();
      }}
      tooltip={`${format} (${shortcut})`}
    >
      <Icon />
    </Button>
  );
};