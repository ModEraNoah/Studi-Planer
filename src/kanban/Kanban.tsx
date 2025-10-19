import { useState } from "react";
import { type DragEvent } from "react";

export interface Todo {
  name: string;
  dueAt: Date;
  assignee: string;
  state: string;
  todoId: string;
}

function KanbanItem({ item }: { item: Todo }) {
  const bgColor =
    item.state == "todo"
      ? "bg-blue-200"
      : item.state == "in progress"
      ? "bg-amber-200"
      : "bg-emerald-500";
  return (
    <div
      draggable="true"
      onDragStart={(el) =>
        el.dataTransfer.setData("kanbanitem", JSON.stringify(item))
      }
      className={`font-normal text-left p-2 m-1 border-2 rounded-xl ${bgColor}`}
    >
      <h3 className="font-semibold text-center">{item.name}</h3>
      <p>Due at: {item.dueAt.toUTCString()}</p>
      <p>Assignee: {item.assignee}</p>
    </div>
  );
}

function KanbanSection({
  section,
  todos,
  updateTodos,
}: {
  section: string;
  todos: Todo[];
  updateTodos: any;
}) {
  const onDropAction = (dropElement: DragEvent) => {
    const kanbanItem = dropElement.dataTransfer.getData("kanbanitem");
    const parsedTodo: Todo = JSON.parse(kanbanItem);
    updateTodos((todos: Todo[]) => {
      return todos.map((todo) => {
        if (todo.todoId === parsedTodo.todoId)
          todo.state = section.toLowerCase();

        return todo;
      });
    });
  };

  return (
    <div className="px-2">
      <p>{section.toUpperCase()}</p>
      <div
        className="border min-h-90"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(dropElement) => onDropAction(dropElement)}
      >
        {todos.map((todo) => {
          return <KanbanItem item={todo} />;
        })}
      </div>
    </div>
  );
}

export function Kanban({ startTodos }: { startTodos: Todo[] }) {
  const [todos, updateTodos] = useState(startTodos);

  const sections = ["todo", "in progress", "finished"];
  return (
    <div className="justify-self-center max-w-fit">
      <h2 className="text-xl font-bold text-center">Kanban</h2>
      <div className="grid grid-cols-3 text-center text-m font-semibold">
        {sections.map((section) => (
          <KanbanSection
            section={section}
            todos={todos.filter((todo) => todo.state == section.toLowerCase())}
            updateTodos={updateTodos}
          />
        ))}
      </div>
    </div>
  );
}
