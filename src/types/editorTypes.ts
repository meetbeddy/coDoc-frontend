import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

// Custom types for Slate editor
export type ParagraphElement = { type: "paragraph"; children: CustomText[] };
export type BlockquoteElement = { type: "blockquote"; children: CustomText[] };
export type BulletedListElement = {
	type: "bulleted-list";
	children: ListItemElement[];
};
export type NumberedListElement = {
	type: "numbered-list";
	children: ListItemElement[];
};
export type ListItemElement = { type: "list-item"; children: CustomText[] };
export type HeadingOneElement = { type: "heading-one"; children: CustomText[] };
export type HeadingTwoElement = { type: "heading-two"; children: CustomText[] };

export type CustomElement =
	| ParagraphElement
	| BlockquoteElement
	| BulletedListElement
	| NumberedListElement
	| ListItemElement
	| HeadingOneElement
	| HeadingTwoElement;

export type CustomText = {
	text: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
	color?: string;
	backgroundColor?: string;
};

export type BlockType = CustomElement["type"];
export type RelevantBlockType = Exclude<BlockType, "paragraph" | "list-item">;

declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor & HistoryEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
