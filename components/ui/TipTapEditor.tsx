"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

interface TipTapEditorProps {
  initialContent?: string;
  fieldName?: string;
}

export default function SimpleEditorWithProps({
  initialContent,
  fieldName,
}: TipTapEditorProps) {
  const [content, setContent] = React.useState(initialContent);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    immediatelyRender: true,

    content: initialContent || "<p></p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  function addImage() {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }

  return (
    <div className="p-4 border rounded-md space-y-4">
      {editor && (
        <div className="flex flex-wrap gap-2 border-b pb-3">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "font-bold text-blue-600" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "italic text-blue-600" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline") ? "underline text-blue-600" : ""
            }
          >
            Underline
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={
              editor.isActive("strike") ? "line-through text-blue-600" : ""
            }
          >
            Strike
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "text-blue-600" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "text-blue-600" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "text-blue-600" : ""}
          >
            • List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "text-blue-600" : ""}
          >
            1. List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "text-blue-600" : ""}
          >
            “Quote”
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "text-blue-600" : ""}
          >
            Code
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            HR
          </button>
          <button onClick={addImage}>Image</button>
        </div>
      )}

      <EditorContent
        editor={editor}
        className="prose max-w-none min-h-[150px]"
      />
      <input type="hidden" name={fieldName} value={content} />
    </div>
  );
}
