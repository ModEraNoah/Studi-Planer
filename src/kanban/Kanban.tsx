interface Todo {
  name: string;
  dueAt: Date;
  assignee: string;
  state: string;
}

const todos: Todo[] = [
  {
    name: "Formular A32 beantragen",
    dueAt: new Date("2025-10-19 23:55:00"),
    assignee: "Noah",
    state: "todo",
  },
  {
    name: "Formular A32 ausdrucken",
    dueAt: new Date("2025-10-19 20:55:00"),
    assignee: "Noah",
    state: "in progress",
  },
  {
    name: "Formular A32 herunterladen",
    dueAt: new Date("2025-10-19 18:55:00"),
    assignee: "Noah",
    state: "finished",
  },
];

function KanbanItem({ item }: { item: Todo }) {
  const bgColor =
    item.state == "todo"
      ? "bg-blue-200"
      : item.state == "in progress"
      ? "bg-amber-200"
      : "bg-emerald-500";
  return (
    <div
      className={`font-normal text-left p-2 m-1 border-2 rounded-xl ${bgColor}`}
    >
      <h3 className="font-semibold text-center">{item.name}</h3>
      <p>Due at: {item.dueAt.toUTCString()}</p>
      <p>Assignee: {item.assignee}</p>
    </div>
  );
}

export function Kanban() {
  const sections = ["todo", "in progress", "finished"];
  return (
    <div className="justify-self-center max-w-fit">
      <h2 className="text-xl font-bold text-center">Kanban</h2>
      <div className="grid grid-cols-3 text-center text-m font-semibold">
        {sections.map((section) => (
          <div className="px-2">
            <p>{section.toUpperCase()}</p>
            <div className="border min-h-90">
              {todos.map((todo) => {
                if (todo.state.toLowerCase() == section.toLowerCase()) {
                  return <KanbanItem item={todo} />;
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
