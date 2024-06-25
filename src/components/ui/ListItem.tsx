import { FC } from "react";
import { ListItemDate } from "../../types.tsx";

interface ListItemProps {
  data: ListItemDate;
}

export const ListItem: FC<ListItemProps> = ({ data }) => {
  const { id, title, date, content } = data;
  return (
    <div key={id} className="flex flex-col items-start">
      <h3 className="font-bold">{title}</h3>
      <div className="flex gap-2">
        <span className="text-sm">{date}</span>
        <span className="text-sm text-gray-500">{content}</span>
      </div>
    </div>
  );
};
