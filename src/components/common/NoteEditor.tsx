import TextArea from "antd/es/input/TextArea";
import { FC, memo, useEffect, useState } from "react";
import { Button, Input } from "antd";
import { ListItemDate } from "../../types.tsx";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface NoteEditorProps {
  data: ListItemDate;
  current: boolean;
}

export const NoteEditor: FC<NoteEditorProps> = memo(({ data, current }) => {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    setEdit(false);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  // const handleDelete = () => {
  //   setEdit(false);
  // };

  const renderContent = () => {
    return edit ? (
      <div className="flex flex-col">
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
    ) : (
      <div className="flex flex-col px-[11px]">
        <h3 className="text-2xl font-bold py-1 m-0">{title}</h3>
        <Markdown
          children={content}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={dark}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            }
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    setEdit(false);
  }, [current]);

  return (
    <div className="p-4 flex flex-col gap-2 relative">
      <div className="flex flex-col">{renderContent()}</div>
      <div className="flex items-center justify-center absolute top-0 right-0 gap-2 p-4">
        {edit ? (
          <>
            <Button onClick={handleSave}>Сохранить</Button>
            <Button onClick={handleCancel} type="primary">
              Отмена
            </Button>
          </>
        ) : (
          <Button onClick={handleEdit}>Редактировать</Button>
        )}
        <Button type="primary" danger>
          Удалить
        </Button>
      </div>
    </div>
  );
});

interface ComponentProps {
  value: string;
  language: string;
}

const Component: FC<ComponentProps> = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language ?? null} style={docco}>
      {value ?? ""}
    </SyntaxHighlighter>
  );
};
