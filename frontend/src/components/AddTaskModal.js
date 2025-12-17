import { useState, useContext } from "react";
import { api } from "../services/api";
import { RoleContext } from "../context/RoleContext";

function AddTaskModal({ open, onClose, onCreated, socket }) {
  const { role } = useContext(RoleContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");

  if (!open || role !== "editor") return null;

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
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>New Task</h3>

        <input
          placeholder="Task title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
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

        <div className="modal-actions">
          <button onClick={onClose} className="secondary">
            Cancel
          </button>
          <button onClick={submit}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;