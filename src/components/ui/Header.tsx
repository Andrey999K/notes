import Search from "antd/es/input/Search";
import { SearchProps } from "antd/lib/input";

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

export const Header = () => {
  return (
    <div className="p-6">
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
    </div>
  );
};
