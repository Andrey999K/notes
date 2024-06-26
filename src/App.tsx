import { NoteEditor } from "./components/common/NoteEditor.tsx";
import { Header } from "./components/ui/Header.tsx";
import { ConfigProvider, Tabs, theme } from "antd";
import { SearchContextType, ThemeContextType } from "./types.tsx";
import { ListItem } from "./components/ui/ListItem.tsx";
import React, { createContext, useState } from "react";
import { noteListData } from "./mockData.ts";

const getCurrentThemeSystem = () => {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  return prefersDarkScheme.matches ? "dark" : "light";
};

export const ThemeContext: React.Context<undefined | ThemeContextType> =
  createContext(undefined);

export const SearchContext: React.Context<undefined | SearchContextType> =
  createContext(undefined);

function App() {
  const [currentNote, setCurrentNote] = useState<number | null>(1);
  const [currentTheme, setCurrentTheme] = useState<string>(
    getCurrentThemeSystem || "dark"
  );
  const [search, setSearch] = useState("");
  console.log(noteListData);
  const noteList = search
    ? noteListData.filter(note =>
        note.content.toLowerCase().includes(search.toLowerCase())
      )
    : noteListData;

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <SearchContext.Provider value={{ setSearch }}>
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
              currentTheme === "dark" ? "bg-[#141414] dark" : ""
            }`}
          >
            <Header />
            {noteList.length ? (
              <Tabs
                defaultActiveKey="1"
                tabPosition="left"
                items={noteList.map((item, i) => {
                  const { id } = item;
                  return {
                    label: <ListItem data={item} />,
                    key: String(id),
                    disabled: i === 28,
                    children: currentNote && (
                      <NoteEditor
                        data={item}
                        current={currentNote === item.id}
                      />
                    )
                  };
                })}
                size="large"
                tabBarStyle={{
                  width: "100%",
                  maxWidth: "300px"
                }}
                onChange={(activeKey: string) =>
                  setCurrentNote(Number(activeKey))
                }
                className="dark:border-gray-600"
              />
            ) : (
              <p className="m-auto text-2xl border-none font-semibold dark:text-white">
                Ничего не найдено.
              </p>
            )}
          </div>
        </ConfigProvider>
      </SearchContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
