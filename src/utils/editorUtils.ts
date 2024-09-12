import { Editor, Transforms, Element as SlateElement } from "slate";
import { CustomElement, CustomText } from "../types/editorTypes";

export const toggleMark = (
	editor: Editor,
	format: keyof Omit<CustomText, "text">
) => {
	const isActive = isMarkActive(editor, format);
	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

export const isMarkActive = (
	editor: Editor,
	format: keyof Omit<CustomText, "text">
) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

export const toggleBlock = (editor: Editor, format: CustomElement["type"]) => {
	const isActive = isBlockActive(editor, format);
	const isList = ["bulleted-list", "numbered-list"].includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) &&
			SlateElement.isElement(n) &&
			["bulleted-list", "numbered-list"].includes(n.type),
		split: true,
	});

	const newProperties: Partial<CustomElement> = {
		type: isActive ? "paragraph" : isList ? "list-item" : format,
	};

	Transforms.setNodes<CustomElement>(editor, newProperties);

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

export const isBlockActive = (
	editor: Editor,
	format: CustomElement["type"]
) => {
	const { selection } = editor;
	if (!selection) return false;

	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: (n) =>
				!Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
		})
	);

	return !!match;
};

export const toggleColor = (
	editor: Editor,
	format: "color" | "backgroundColor",
	color: string
) => {
	const isActive = isColorActive(editor, format, color);
	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, color);
	}
};

export const isColorActive = (
	editor: Editor,
	format: "color" | "backgroundColor",
	color: string
) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === color : false;
};
