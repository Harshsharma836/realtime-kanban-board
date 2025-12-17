export function moveTask(tasks, source, destination) {
  if (!destination) return tasks;

  const sourceColumn = source.droppableId;
  const destColumn = destination.droppableId;

  const sourceTasks = tasks.filter(t => t.status === sourceColumn);
  const movedTask = sourceTasks[source.index];

  return tasks.map(task =>
    task._id === movedTask._id
      ? { ...task, status: destColumn }
      : task
  );
}
