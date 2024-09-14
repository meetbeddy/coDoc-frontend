import React, { useState } from 'react';

interface DocumentAreaProps {
    children: React.ReactNode;
}

const DocumentArea: React.FC<DocumentAreaProps> = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(true); // State for toggling the left panel

    return (
        <div className="flex h-full pt-2">
            {/* Left column: Notes/Recent Documents */}
            <div className={`transition-all duration-300 bg-gray-200 p-4 ${isExpanded ? 'w-1/5' : 'w-1/12'} flex-shrink-0`}>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mb-4 text-blue-500 hover:underline"
                >
                    {isExpanded ? 'Collapse' : 'Expand'}
                </button>
                {isExpanded ? (
                    <div>
                        <p>Recent Documents</p>
                    </div>
                ) : (
                    <div>
                        <p>Docs</p>
                    </div>
                )}
            </div>

            {/* Middle column: Text Editor */}
            <div className="flex-1 bg-white shadow-md">
                {children}
            </div>

            {/* Right column: Placeholder for future use */}
            <div className="w-1/5 bg-gray-200 p-4 flex-shrink-0">
                <p>Placeholder for future content</p>
            </div>
        </div>
    );
};

export default DocumentArea;
