import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Input } from "antd";

export const NoteEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="p-4 flex flex-col gap-2">
      <Input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Новая заметка"
        className="text-2xl font-bold border-none overflow-hidden focus:overflow-hidden focus:border-none focus:shadow-none"
      />
      <TextArea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Текст заметки"
        autoSize={{ minRows: 3 }}
        className="border-none overflow-hidden focus:overflow-hidden focus:border-none focus:shadow-none"
      />
    </div>
  );
};
