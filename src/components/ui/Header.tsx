import Search from "antd/es/input/Search";
import { SearchProps } from "antd/lib/input";
import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { SearchContext, ThemeContext } from "../../App.tsx";

export const Header = () => {
  const theme = useContext(ThemeContext);
  const search = useContext(SearchContext);
  const onChange = (checked: boolean) => {
    theme?.setCurrentTheme(checked ? "dark" : "light");
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    search?.setSearch(value);
  };

  return (
    <div className="p-6 flex items-center gap-6">
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <Switch
        defaultChecked={theme?.currentTheme === "dark"}
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
        onChange={onChange}
        className="scale-150"
      />
    </div>
  );
};
