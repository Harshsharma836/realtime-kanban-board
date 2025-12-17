import { moveTask } from "../utils/dndUtils";

describe("DnD moveTask", () => {
  const tasks = [
    { _id: "1", title: "Task 1", status: "todo" },
    { _id: "2", title: "Task 2", status: "inprogress" }
  ];

  test("moves task to new column", () => {
    const result = moveTask(
      tasks,
      { droppableId: "todo", index: 0 },
      { droppableId: "done", index: 0 }
    );

    expect(result.find(t => t._id === "1").status).toBe("done");
  });

  test("returns same tasks if destination is null", () => {
    const result = moveTask(tasks, { droppableId: "todo", index: 0 }, null);
    expect(result).toEqual(tasks);
  });
});
