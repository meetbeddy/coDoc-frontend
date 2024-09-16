import React, { useState, useMemo, useCallback } from 'react';
import { Slate, Editable } from 'slate-react';
import { Toolbar } from '../editor/ToolBar';
import { useEditorConfig } from '../../hooks/useEditorConfig';
import { FaExpandAlt, FaCompressAlt } from 'react-icons/fa';
import { CustomText, CustomElement } from '../../types/editorTypes';
import { Text, Element as SlateElement } from 'slate';

type CustomDescendant = CustomElement | CustomText;

const RichTextEditor: React.FC = () => {
    const { editor, renderElement, renderLeaf, initialValue, handleKeyDown } = useEditorConfig();
    const [value, setValue] = useState<CustomDescendant[]>(initialValue);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const getWordCount = useCallback((nodes: CustomDescendant[]): number => {
        return nodes.reduce((count, node) => {
            if (Text.isText(node)) {
                return count + node.text.trim().split(/\s+/).filter(Boolean).length;
            } else if (SlateElement.isElement(node)) {
                return count + getWordCount(node.children);
            }
            return count;
        }, 0);
    }, []);

    const getCharacterCount = useCallback((nodes: CustomDescendant[]): number => {
        return nodes.reduce((count, node) => {
            if (Text.isText(node)) {
                return count + node.text.length;
            } else if (SlateElement.isElement(node)) {
                return count + getCharacterCount(node.children);
            }
            return count;
        }, 0);
    }, []);

    // Memoize word and character counts to prevent unnecessary recalculations
    const wordCount = useMemo(() => getWordCount(value), [getWordCount, value]);
    const characterCount = useMemo(() => getCharacterCount(value), [getCharacterCount, value]);

    return (
        <div className={`transition-all duration-300 ease-in-out ${isFullScreen ? 'fixed inset-0 z-50 bg-white' : 'relative'}`}>
            <Slate editor={editor} initialValue={value} onChange={newValue => setValue(newValue)}>
                <div className={`flex flex-col border border-gray-300 rounded-md overflow-hidden shadow-lg ${isFullScreen ? 'h-screen' : 'h-[calc(100vh-100px)]'}`}>
                    {/* Toolbar*/}
                    <div className="flex justify-between items-center bg-gray-100 border-b border-gray-300">
                        <Toolbar />
                        <button
                            onClick={toggleFullScreen}
                            className="p-2 m-1 text-gray-600 hover:text-blue-500 transition-colors duration-200"
                        >
                            {isFullScreen ? <FaCompressAlt /> : <FaExpandAlt />}
                        </button>
                    </div>

                    {/* Text area */}
                    <div className="flex-1 overflow-auto bg-white">
                        <Editable
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder="Start typing here..."
                            spellCheck
                            autoFocus
                            style={editableStyles}
                            onKeyDown={(event) => {
                                if (event.key === 'Tab') {
                                    event.preventDefault();
                                    editor.insertText('    ');
                                }
                                handleKeyDown(event);
                            }}
                        />
                    </div>

                    {/* Status bar */}
                    <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-t border-gray-300 text-sm text-gray-600">
                        <div>
                            Words: {wordCount}
                        </div>
                        <div>
                            Characters: {characterCount}
                        </div>
                    </div>
                </div>
            </Slate>
        </div>
    );
};

const editableStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    padding: '1rem',
    outline: 'none',
    maxWidth: '100%',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap'
}

export default RichTextEditor;
