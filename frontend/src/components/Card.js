import { Draggable } from "@hello-pangea/dnd";
import React, { useContext } from "react";
import { api } from "../services/api";
import { RoleContext } from "../context/RoleContext";

const Card = React.memo(({ task, index, socket, onDelete }) => {
  const { role } = useContext(RoleContext);

  const deleteTask = async () => {
    if (role !== "editor") return;

    onDelete(task._id);

    await api.delete(`/tasks/${task._id}`, {
      headers: { role },
    });

    socket.emit("taskChanged");
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
  className="card"
  ref={provided.innerRef}
  {...provided.draggableProps}
  {...provided.dragHandleProps}
>
  {/* HEADER */}
  <div className="card-header">
    <h4 className="card-title">{task.title}</h4>

    {role === "editor" && (
      <button className="delete-btn" onClick={deleteTask}>
        ✕
      </button>
    )}
  </div>

  {/* DESCRIPTION */}
  {task.description && (
    <p className="card-desc">{task.description}</p>
  )}

  {/* META */}
  <div className="card-footer">
    {task.assignee && (
      <span className="meta">
        👤 {task.assignee}
      </span>
    )}

    {task.dueDate && (
      <span className="meta">
        📅 {new Date(task.dueDate).toLocaleDateString()}
      </span>
    )}
  </div>
</div>

      )}
    </Draggable>
  );
});

export default Card;
