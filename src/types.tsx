import React from "react";

export type ListItemDate = {
  id: number;
  title: string;
  date: string;
  content: string;
};

export type ThemeContextType = {
  currentTheme: string;
  setCurrentTheme: React.Dispatch<React.SetStateAction<string>>;
};

export type SearchContextType = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};
