import React, { useState, useRef, useEffect } from 'react';

export const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const childRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible && childRef.current) {
            const rect = childRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top - 30,
                left: rect.left + rect.width / 2,
            });
        }
    }, [isVisible]);

    return (
        <>
            <div
                ref={childRef}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                className="h-full flex items-center justify-center"
            >
                {children}
            </div>
            {isVisible && (
                <div
                    style={{
                        position: 'fixed',
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                    }}
                    className="px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded shadow-sm pointer-events-none"
                >
                    {content}
                </div>
            )}
        </>
    );
};