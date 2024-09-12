import { useMemo, useCallback } from 'react';
import { createEditor, Descendant } from 'slate';
import { withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { withHistory } from 'slate-history';
import { Leaf } from '../components/editor/Leaf';
import { Element } from '../components/editor/Element';
import { toggleMark } from '../utils/editorUtils';


export const useEditorConfig = () => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);

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

  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];

  return { editor, renderElement, renderLeaf, initialValue, handleKeyDown };
};



