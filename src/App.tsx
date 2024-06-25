import { NoteEditor } from "./components/common/NoteEditor.tsx";
import { Header } from "./components/ui/Header.tsx";
import { ConfigProvider, Tabs, theme } from "antd";
import { ListItemDate, ThemeContextType } from "./types.tsx";
import { ListItem } from "./components/ui/ListItem.tsx";
import { createContext, useState } from "react";

const getCurrentThemeSystem = () => {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  return prefersDarkScheme.matches ? "dark" : "light";
};

export const ThemeContext: React.Context<undefined | ThemeContextType> =
  createContext(undefined);

function App() {
  const [currentNote, setCurrentNote] = useState<number | null>(1);
  const [currentTheme, setCurrentTheme] = useState<string>(
    getCurrentThemeSystem || "dark"
  );

  const noteListData: ListItemDate[] = [
    {
      id: 1,
      title: "Новая заметка 1",
      date: "12:17",
      content: "Начал делать домашку по React"
    },
    {
      id: 2,
      title: "Новая заметка 2",
      date: "12:17",
      content: "Начал делать домашку по React"
    }
  ];

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <ConfigProvider
        theme={{
          // 1. Use dark algorithm
          algorithm:
            currentTheme === "dark"
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm

          // 2. Combine dark algorithm and compact algorithm
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }}
      >
        <div
          className={`divide-y-[1px] divide-y-gray h-screen flex flex-col ${
            currentTheme === "dark" ? "bg-[#141414]" : ""
          }`}
        >
          <Header />
          <Tabs
            defaultActiveKey="1"
            tabPosition="left"
            items={noteListData.map((item, i) => {
              const { id } = item;
              return {
                label: <ListItem data={item} />,
                key: String(id),
                disabled: i === 28,
                children: currentNote && (
                  <NoteEditor data={item} current={currentNote === item.id} />
                )
              };
            })}
            size="large"
            tabBarStyle={{
              width: "100%",
              maxWidth: "300px"
            }}
            onChange={(activeKey: string) => setCurrentNote(Number(activeKey))}
          />
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export default App;
