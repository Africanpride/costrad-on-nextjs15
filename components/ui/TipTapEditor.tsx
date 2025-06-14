"use client";

import * as React from "react";
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

// Add any other extensions or UI as needed


interface TipTapEditorProps {
  initialContent?: string;
  fieldName?: string;
}

export default function SimpleEditorWithProps({ initialContent, fieldName }: TipTapEditorProps) {

  const [content, setContent] = React.useState(initialContent);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="p-4 border rounded-md">
      <EditorContext.Provider value={{ editor }}>
        <EditorContent editor={editor} className="prose max-w-none" />
        <input type="hidden" name={fieldName} value={content} />
      </EditorContext.Provider>
    </div>
  );
}
