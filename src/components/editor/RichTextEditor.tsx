import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { createEditor, Transforms, Editor as SlateEditor, Descendant, BaseEditor } from 'slate';
import { Slate, Editable, withReact, useSlate, RenderElementProps, RenderLeafProps, ReactEditor } from 'slate-react';
import { HistoryEditor, withHistory } from 'slate-history';
import { FaBold, FaItalic, FaListUl, FaQuoteRight, FaHeading, FaUnderline, FaStrikethrough, FaCode, FaListOl, FaUndo, FaRedo } from 'react-icons/fa';

// custom types
type ParagraphElement = { type: 'paragraph'; children: CustomText[] };
type BlockquoteElement = { type: 'blockquote'; children: CustomText[] };
type BulletedListElement = { type: 'bulleted-list'; children: ListItemElement[] };
type NumberedListElement = { type: 'numbered-list'; children: ListItemElement[] };
type ListItemElement = { type: 'list-item'; children: CustomText[] };
type HeadingOneElement = { type: 'heading-one'; children: CustomText[] };
type HeadingTwoElement = { type: 'heading-two'; children: CustomText[] };


type CustomElement = ParagraphElement | BlockquoteElement | BulletedListElement | NumberedListElement | ListItemElement | HeadingOneElement | HeadingTwoElement;
type CustomText = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
};



type BlockType = CustomElement['type'];
type RelevantBlockType = Exclude<BlockType, 'paragraph' | 'list-item'>;


declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}
const RichTextEditor: React.FC = () => {
    const editor = useMemo(() => withReact(withHistory(createEditor())), []);
    const [value, setValue] = useState<Descendant[]>([
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ]);

    const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
    const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (!event.ctrlKey) return;

        switch (event.key) {
            case 'b': {
                event.preventDefault();
                toggleMark(editor, 'bold');
                break;
            }
            case 'i': {
                event.preventDefault();
                toggleMark(editor, 'italic');
                break;
            }
            case 'u': {
                event.preventDefault();
                toggleMark(editor, 'underline');
                break;
            }
            case '`': {
                event.preventDefault();
                toggleMark(editor, 'code');
                break;
            }
            case 'z': {
                event.preventDefault();
                editor.undo();

                break;
            }
            case 'y': {
                event.preventDefault();
                editor.redo();
                break;
            }
        }
    }, [editor]);

    return (
        <Slate editor={editor} initialValue={value} onChange={newValue => setValue(newValue)}>
            <div className="border border-gray-300 rounded-md overflow-hidden">
                <Toolbar>
                    <HistoryButton format="undo" icon={<FaUndo />} shortcut="Ctrl+Z" />
                    <HistoryButton format="redo" icon={<FaRedo />} shortcut="Ctrl+Y" />
                    <MarkButton format="bold" icon={<FaBold />} shortcut="Ctrl+B" />
                    <MarkButton format="italic" icon={<FaItalic />} shortcut="Ctrl+I" />
                    <MarkButton format="underline" icon={<FaUnderline />} shortcut="Ctrl+U" />
                    <MarkButton format="strikethrough" icon={<FaStrikethrough />} />
                    <MarkButton format="code" icon={<FaCode />} shortcut="Ctrl+`" />
                    <BlockButton format="bulleted-list" icon={<FaListUl />} />
                    <BlockButton format="numbered-list" icon={<FaListOl />} />
                    <BlockButton format="blockquote" icon={<FaQuoteRight />} />
                    <BlockButton format="heading-one" icon={<FaHeading />} />
                    <BlockButton format="heading-two" icon={<FaHeading size={12} />} />
                </Toolbar>
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
                        handleKeyDown(event)
                    }}
                />
            </div>
        </Slate>
    );
};

const Toolbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="flex flex-wrap p-2 mb-0.5 bg-gray-100 border-b border-gray-300">{children}</div>;
};

const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const childRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible && childRef.current) {
            const rect = childRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top - 40,
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

const MarkButton: React.FC<{ format: keyof Omit<CustomText, 'text'>; icon: React.ReactNode; shortcut?: string; }> = ({ format, icon, shortcut }) => {
    const editor = useSlate();
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
            tooltip={shortcut ? `${format} (${shortcut})` : undefined}
        >
            {icon}
        </Button>
    );
};

const HistoryButton: React.FC<{ format: 'undo' | 'redo'; icon: React.ReactNode; shortcut?: string }> = ({ format, icon, shortcut }) => {
    const editor = useSlate();
    return (
        <Button
            onMouseDown={event => {
                event.preventDefault();
                if (format === 'undo') editor.undo();
                else editor.redo();
            }}
            tooltip={`${format} (${shortcut})`}
        >
            {icon}
        </Button>
    );
};

const BlockButton: React.FC<{ format: RelevantBlockType; icon: React.ReactNode; shortcut?: string }> = ({ format, icon, shortcut }) => {
    const editor = useSlate();
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
            tooltip={shortcut ? `${format} (${shortcut})` : undefined}
        >
            {icon}
        </Button>
    );
};


const Button: React.FC<{
    active?: boolean;
    onMouseDown: (event: React.MouseEvent) => void;
    children: React.ReactNode;
    tooltip?: string;
}> = ({ active, onMouseDown, children, tooltip }) => {
    const buttonContent = (
        <span
            onMouseDown={onMouseDown}
            className={`cursor-pointer p-2 ${active ? 'text-blue-500' : 'text-gray-500'
                } hover:text-blue-500 transition-colors duration-200 flex items-center justify-center h-full`}
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

const Element = ({ attributes, children, element }: RenderElementProps) => {
    switch (element.type) {
        case 'blockquote':
            return <blockquote {...attributes} className="border-l-4 border-gray-300 pl-4 italic">{children}</blockquote>;
        case 'bulleted-list':
            return <ul {...attributes} className="list-disc list-inside">{children}</ul>;
        case 'numbered-list':
            return <ol {...attributes} className="list-decimal list-inside">{children}</ol>;
        case 'heading-one':
            return <h1 {...attributes} className="text-2xl font-bold">{children}</h1>;
        case 'heading-two':
            return <h2 {...attributes} className="text-xl font-bold">{children}</h2>;
        case 'list-item':
            return <li {...attributes}>{children}</li>;

        default:
            return <p {...attributes}>{children}</p>;
    }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }
    if (leaf.italic) {
        children = <em>{children}</em>;
    }
    if (leaf.underline) {
        children = <u>{children}</u>;
    }
    if (leaf.strikethrough) {
        children = <del>{children}</del>;
    }
    if (leaf.code) {
        children = <code
            className="bg-gray-200 text-blue-600 font-mono px-2 py-1 rounded text-sm"
        >
            {children}
        </code>
    }
    return <span {...attributes}>{children}</span>;
};

const isMarkActive = (editor: SlateEditor, format: keyof Omit<CustomText, 'text'>) => {
    const marks = SlateEditor.marks(editor);
    return marks ? marks[format] === true : false;
};

const toggleMark = (editor: SlateEditor, format: keyof Omit<CustomText, 'text'>) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        SlateEditor.removeMark(editor, format);
    } else {
        SlateEditor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor: SlateEditor, format: CustomElement['type']) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
        SlateEditor.nodes(editor, {
            at: SlateEditor.unhangRange(editor, selection),
            match: n => {
                return !SlateEditor.isEditor(n) && (n as CustomElement).type === format;
            },
        })
    );

    return !!match;
};


const toggleBlock = (editor: SlateEditor, format: CustomElement['type']) => {
    const isActive = isBlockActive(editor, format);
    const isList = ['bulleted-list', 'numbered-list'].includes(format);

    // Unwrap any existing lists
    Transforms.unwrapNodes(editor, {
        match: n =>
            !SlateEditor.isEditor(n) &&
            SlateEditor.isBlock(editor, n as CustomElement) &&
            ['bulleted-list', 'numbered-list'].includes((n as CustomElement).type),
        split: true,
    });

    // Define new block properties
    const newProperties: Partial<CustomElement> = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };

    // Set the new block type
    Transforms.setNodes<CustomElement>(editor, newProperties);

    //  wrap the list items if we're activating a list
    if (!isActive && isList) {
        // Transforms.wrapNodes(editor, { type: 'bulleted-list', children: [] });
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};



export default RichTextEditor;