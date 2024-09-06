import React from 'react';

interface DocumentAreaProps {
    children: React.ReactNode;
}

const DocumentArea: React.FC<DocumentAreaProps> = ({ children }) => {
    return (
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {children}
        </div>
    );
};

export default DocumentArea;
