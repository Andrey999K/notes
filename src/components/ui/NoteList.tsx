export const NoteList = () => {
  const noteListData = [
    {
      id: 1,
      title: "Новая заметка 1",
      date: "12:17",
      text: "Начал делать домашку по React"
    },
    {
      id: 2,
      title: "Новая заметка 2",
      date: "12:17",
      text: "Начал делать домашку по React"
    }
  ];
  return (
    <div className="flex flex-col divide-y-[1px] divide-y-gray">
      {noteListData.map(note => (
        <div
          key={note.id}
          className="px-6 py-2 cursor-pointer hover:bg-gray-100"
        >
          <h3 className="font-bold">{note.title}</h3>
          <div className="flex gap-2">
            <span className="text-sm">{note.date}</span>
            <span className="text-sm text-gray-500">{note.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
