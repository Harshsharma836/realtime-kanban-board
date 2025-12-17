# 🧩 Kanban Board – Real-Time Task Management App

A Trello-like Kanban Board built with **React, Node.js, Express, MongoDB, and Socket.IO**.
Supports **real-time updates**, **role-based access**, **drag & drop**, and **performance optimizations**.

🔗 **Live Demo:**
👉 [https://kanban-editor.netlify.app/](https://kanban-editor.netlify.app/)

---

## 🚀 Features

### ✅ Board View

* Columns: **To Do**, **In Progress**, **Done**
* Cards with:

  * Title
  * Description
  * Assignee
  * Due Date

### ✅ Drag & Drop

* Move cards between columns
* Optimistic UI updates
* Backend sync after drop

### ✅ Real-Time Updates

* Implemented using **Socket.IO**
* Multiple clients stay in sync without refresh

### ✅ Role-Based Access

* **Viewer**

  * Read-only access
* **Editor**

  * Create, update, delete, and drag tasks
* Role stored in **React Context**
* Role enforced on **backend APIs**

### ✅ UI / UX

* Modern Kanban UI
* Modal-based task creation
* Dark / Light theme toggle

### ✅ Performance

* `React.memo` to avoid unnecessary re-renders
* List virtualization using `react-window` for large boards

### ✅ Testing

* Unit tests for Drag & Drop logic
* Jest setup with proper mocks
* Clean and passing test suite

---

## 🛠 Tech Stack

### Frontend

* React (JavaScript)
* @hello-pangea/dnd
* Socket.IO Client
* Axios
* React Window
* Jest + Testing Library

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Socket.IO
* Jest + Supertest

---

## 📁 Project Structure

```
kanban-project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── utils/
│   │   └── tests/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── tests/
│   └── package.json
```

---

## 🧠 Architecture Overview

* **Frontend**

  * React Context for Role & Theme
  * Optimistic UI for drag & drop
  * WebSocket listener for real-time sync

* **Backend**

  * REST APIs for CRUD operations
  * Role-based middleware
  * Socket.IO events to notify all clients

---

## 🧪 Tests

* Drag & Drop logic tested via pure utility function
* API and UI dependencies mocked properly
* Jest tests pass without warnings

### ▶ Run tests

```bash
npm run test
```

### 📸 Test Results Screenshot

```md
![Test Results](./screenshots/tests.png)
```

---

## 🎨 UI Screenshots

### Kanban Board UI

```md
![Kanban UI](./screenshots/ui.png)
```

### Add Task Modal

```md
![Add Task Modal](./screenshots/modal.png)
```

---

## ⚙️ Setup Instructions

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🌍 Deployment

* **Frontend:** Netlify
  👉 [https://kanban-editor.netlify.app/](https://kanban-editor.netlify.app/)
* **Backend:** Can be deployed on Render / Railway / Cyclic

---

## 🧾 Key Design Decisions

* Used **Socket.IO** instead of polling for real-time sync
* Extracted DnD logic into pure functions for testability
* Used virtualization for scalability
* Modal-based UI to keep board clean

---

## 👤 Author

**Harsh Sharma**
Full-Stack Developer (Backend-focused)
