import { RenderElementProps } from "slate-react";

export const Element = ({ attributes, children, element }: RenderElementProps) => {
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