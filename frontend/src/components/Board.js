import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import { api } from "../services/api";
import { useContext } from "react";
import { RoleContext } from "../context/RoleContext";
import { moveTask } from "../utils/dndUtils";


const columns = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

function Board({ tasks, setTasks, socket }) {
  const { role } = useContext(RoleContext);

  const onDragEnd = async ({ source, destination }) => {
  if (!destination || role !== "editor") return;

  // optimistic UI
  setTasks(prev => moveTask(prev, source, destination));

  const movedTask = tasks
    .filter(t => t.status === source.droppableId)[source.index];

  await api.put(
    `/tasks/${movedTask._id}`,
    { status: destination.droppableId },
    { headers: { role } }
  );

  socket.emit("taskChanged");
};

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {columns.map(col => (
          <Column
            key={col.id}
            column={col}
            tasks={tasks.filter(t => t.status === col.id)}
            socket={socket}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </DragDropContext>
  );
}

export default Board;
