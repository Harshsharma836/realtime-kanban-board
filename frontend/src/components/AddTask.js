import { useState, useContext } from "react";
import { api } from "../services/api";
import { RoleContext } from "../context/RoleContext";

function AddTask({ onCreated, socket }) {
  const { role } = useContext(RoleContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");

  if (role !== "editor") return null;

  const submit = async () => {
    if (!title) return;

    await api.post(
      "/tasks",
      { title, description, assignee, dueDate, status: "todo" },
      { headers: { role } }
    );

    socket.emit("taskChanged");

    setTitle("");
    setDescription("");
    setAssignee("");
    setDueDate("");

    onCreated();
  };

  return (
    <div className="add-task">
      <input
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="Assignee"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button onClick={submit}>Add Task</button>
    </div>
  );
}

export default AddTask;
