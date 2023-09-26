import React from 'react';
import ReactQuill from 'react-quill';
import { Container } from './TextEditor.styles';
import 'react-quill/dist/quill.snow.css'

interface TextEditorProps {
  color: string;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}
const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "list",

  "color",
  "background",

  "image",
  "blockquote",
  "code-block",
];

const modules = {
  toolbar: [
    [{ list: "ordered" }, { list: "bullet" }],
    [],
    ["italic", "underline", "strike"],
    [],
    [{ color: [] }, { background: [] }],
    [],
    ["image", "blockquote", "code-block"],
  ],
};

const TextEditor = ({ color, content, setContent }: TextEditorProps) => {
  return (
    <Container $noteColor={color}>
      <ReactQuill
        formats={formats}
        modules={modules}
        theme="snow"
        value={content}
        onChange={setContent}
      />
    </Container>
  );
};

export default TextEditor