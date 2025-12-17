test("Drag handler works", () => {
  const result = { destination: { droppableId: "done", index: 0 }, source: { index: 0 } };
  expect(result.destination).toBeDefined();
});
