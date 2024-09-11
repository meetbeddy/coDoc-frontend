import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Transforms, Editor as SlateEditor, Descendant, BaseEditor } from 'slate';
import { Slate, Editable, withReact, useSlate, RenderElementProps, RenderLeafProps, ReactEditor } from 'slate-react';
import { HistoryEditor, withHistory } from 'slate-history';
import { FaBold, FaItalic, FaListUl, FaQuoteRight, FaHeading, FaUnderline, FaStrikethrough, FaCode } from 'react-icons/fa';

// custom types
type ParagraphElement = { type: 'paragraph'; children: CustomText[] };
type BlockquoteElement = { type: 'blockquote'; children: CustomText[] };
type BulletedListElement = { type: 'bulleted-list'; children: ListItemElement[] };
type ListItemElement = { type: 'list-item'; children: CustomText[] };
type HeadingOneElement = { type: 'heading-one'; children: CustomText[] };

type CustomElement = ParagraphElement | BlockquoteElement | BulletedListElement | ListItemElement | HeadingOneElement;
type CustomText = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
};


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
            children: [{ text: 'Start typing here...' }],
        },
    ]);

    const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
    const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

    return (
        <Slate editor={editor} initialValue={value} onChange={newValue => setValue(newValue)}>
            <div className="border border-gray-300 rounded-md overflow-hidden">
                <Toolbar>
                    <MarkButton format="bold" icon={<FaBold />} />
                    <MarkButton format="italic" icon={<FaItalic />} />
                    <MarkButton format="underline" icon={<FaUnderline />} />
                    <MarkButton format="strikethrough" icon={<FaStrikethrough />} />
                    <MarkButton format="strikethrough" icon={<FaStrikethrough />} />
                    <MarkButton format="code" icon={<FaCode />} />
                    <BlockButton format="bulleted-list" icon={<FaListUl />} />
                    <BlockButton format="blockquote" icon={<FaQuoteRight />} />
                    <BlockButton format="heading-one" icon={<FaHeading />} />
                </Toolbar>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Start typing here..."
                    spellCheck
                    autoFocus
                    className="min-h-[200px] p-4"
                />
            </div>
        </Slate>
    );
};

const Toolbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="flex p-2 bg-gray-100 border-b border-gray-300">{children}</div>;
};

const MarkButton: React.FC<{ format: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code'; icon: React.ReactNode }> = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            {icon}
        </Button>
    );
};

const BlockButton: React.FC<{ format: 'blockquote' | 'bulleted-list' | 'heading-one'; icon: React.ReactNode }> = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            {icon}
        </Button>
    );
};


const Button: React.FC<{ active: boolean; onMouseDown: (event: React.MouseEvent) => void; children: React.ReactNode }> = ({ active, onMouseDown, children }) => {
    return (
        <span
            onMouseDown={onMouseDown}
            className={`cursor-pointer p-2 ${active ? 'text-blue-500' : 'text-gray-500'
                } hover:text-blue-500 transition-colors duration-200`}
        >
            {children}
        </span>
    );
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
    switch (element.type) {
        case 'blockquote':
            return <blockquote {...attributes} className="border-l-4 border-gray-300 pl-4 italic">{children}</blockquote>;
        case 'bulleted-list':
            return <ul {...attributes} className="list-disc list-inside">{children}</ul>;
        case 'heading-one':
            return <h1 {...attributes} className="text-2xl font-bold">{children}</h1>;
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
        children = <code>{children}</code>;
    }
    return <span {...attributes}>{children}</span>;
};

const isMarkActive = (editor: SlateEditor, format: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code') => {
    const marks = SlateEditor.marks(editor);
    return marks ? marks[format] === true : false;
};

const toggleMark = (editor: SlateEditor, format: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code') => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        SlateEditor.removeMark(editor, format);
    } else {
        SlateEditor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor: SlateEditor, format: 'blockquote' | 'bulleted-list' | 'heading-one') => {
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


const toggleBlock = (editor: SlateEditor, format: 'blockquote' | 'bulleted-list' | 'heading-one') => {
    const isActive = isBlockActive(editor, format);
    const isList = format === 'bulleted-list';

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
        Transforms.wrapNodes(editor, { type: 'bulleted-list', children: [] });
    }
};



export default RichTextEditor;