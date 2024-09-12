import React from 'react';
import { Tooltip } from '../ToolTip';

export const Button: React.FC<{
    active?: boolean;
    onMouseDown?: (event: React.MouseEvent) => void;
    children: React.ReactNode;
    tooltip?: string;
}> = ({ active, onMouseDown, children, tooltip }) => {
    const buttonContent = (
        <span
            onMouseDown={onMouseDown}
            className={`cursor-pointer p-2 ${active ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500 transition-colors duration-200 flex items-center justify-center h-full`}
        >
            {children}
        </span>
    );

    return (
        <div className="h-8 w-8 flex items-center justify-center">
            {tooltip ? <Tooltip content={tooltip}>{buttonContent}</Tooltip> : buttonContent}
        </div>
    );
};