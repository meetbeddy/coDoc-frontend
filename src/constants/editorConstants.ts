import {
	FaBold,
	FaItalic,
	FaListUl,
	FaQuoteRight,
	FaHeading,
	FaUnderline,
	FaStrikethrough,
	FaCode,
	FaListOl,
	FaUndo,
	FaRedo,
	FaPaintBrush,
	FaHighlighter,
} from "react-icons/fa";

export const MARK_BUTTONS = [
	{ format: "bold", icon: FaBold, shortcut: "Ctrl+B" },
	{ format: "italic", icon: FaItalic, shortcut: "Ctrl+I" },
	{ format: "underline", icon: FaUnderline, shortcut: "Ctrl+U" },
	{ format: "strikethrough", icon: FaStrikethrough },
	{ format: "code", icon: FaCode, shortcut: "Ctrl+`" },
] as const;

export const BLOCK_BUTTONS = [
	{ format: "bulleted-list", icon: FaListUl },
	{ format: "numbered-list", icon: FaListOl },
	{ format: "blockquote", icon: FaQuoteRight },
	{ format: "heading-one", icon: FaHeading },
	{ format: "heading-two", icon: FaHeading, iconProps: { size: 12 } },
] as const;

export const COLOR_BUTTONS = [
	{ format: "color", icon: FaPaintBrush },
	{ format: "backgroundColor", icon: FaHighlighter },
] as const;

export const HISTORY_BUTTONS = [
	{ format: "undo", icon: FaUndo, shortcut: "Ctrl+Z" },
	{ format: "redo", icon: FaRedo, shortcut: "Ctrl+Y" },
] as const;

export const COLORS = [
	"#000000",
	"#FF0000",
	"#00FF00",
	"#0000FF",
	"#FFFF00",
	"#FF00FF",
	"#00FFFF",
	"#808080",
];
