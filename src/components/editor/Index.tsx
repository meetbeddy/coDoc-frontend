import React, { useState } from 'react';
import { Slate, Editable } from 'slate-react';
import { Toolbar } from '../editor/ToolBar';
import { useEditorConfig } from '../../hooks/useEditorConfig';


const RichTextEditor: React.FC = () => {
    const { editor, renderElement, renderLeaf, initialValue, handleKeyDown } = useEditorConfig();
    const [value, setValue] = useState(initialValue);

    return (
        <Slate editor={editor} initialValue={value} onChange={newValue => setValue(newValue)}>
            <div className="border border-gray-300 rounded-md overflow-hidden">
                <Toolbar />
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Start typing here..."
                    spellCheck
                    autoFocus
                    className="min-h-[200px] p-4"
                    onKeyDown={(event) => {
                        if (event.key === 'Tab') {
                            event.preventDefault();
                            editor.insertText('    ');
                        }
                        handleKeyDown(event);
                    }}
                />
            </div>
        </Slate>
    );
};

export default RichTextEditor;