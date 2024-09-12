import { RenderLeafProps } from "slate-react";

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    const style: React.CSSProperties = {};
    if (leaf.bold) children = <strong>{children}</strong>;
    if (leaf.italic) children = <em>{children}</em>;
    if (leaf.underline) children = <u>{children}</u>;
    if (leaf.strikethrough) children = <del>{children}</del>;
    if (leaf.code) children = <code className="bg-gray-200 text-blue-600 font-mono px-2 py-1 rounded text-sm">{children}</code>;
    if (leaf.color) style.color = leaf.color;
    if (leaf.backgroundColor) style.backgroundColor = leaf.backgroundColor;
    return <span {...attributes} style={style}>{children}</span>;
};