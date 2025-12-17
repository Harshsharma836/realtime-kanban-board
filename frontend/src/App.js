import { useEffect, useState, useContext } from "react";
import io from "socket.io-client";

import Board from "./components/Board";
import ThemeToggle from "./components/ThemeToggle";
import AddTaskModal from "./components/AddTaskModal";

import { api } from "./services/api";
import { RoleContext } from "./context/RoleContext";
import { ThemeContext } from "./context/ThemeContext";

// ✅ backend URL from env (CRA)
const BACKEND_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ create socket connection ONCE (prod-safe)
const socket = io(BACKEND_URL, {
  withCredentials: true,
  transports: ["websocket"],
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const { role, setRole } = useContext(RoleContext);
  const { theme } = useContext(ThemeContext);

  // fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  // socket + initial load
  useEffect(() => {
    console.log("🟢 Socket connected to:", BACKEND_URL);

    fetchTasks();

    socket.on("boardUpdated", () => {
      console.log("🔵 boardUpdated received → refetching");
      fetchTasks();
    });

    return () => {
      socket.off("boardUpdated");
    };
  }, []);

  return (
    <div className={`app ${theme}`}>
      {/* HEADER */}
      <header>
        <h1>Kanban Board</h1>

        {/* Editor-only add button */}
        {role === "editor" && (
          <button onClick={() => setOpenModal(true)}>
            + New Task
          </button>
        )}

        <ThemeToggle />

        {/* ROLE SELECT */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
        </select>
      </header>

      {/* BOARD */}
      <Board
        tasks={tasks}
        setTasks={setTasks}
        socket={socket}
      />

      {/* ADD TASK MODAL */}
      <AddTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={fetchTasks}
        socket={socket}
      />
    </div>
  );
}

export default App;
