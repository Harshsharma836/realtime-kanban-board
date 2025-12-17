import { render, screen } from "@testing-library/react";
import App from "./App";
import { RoleProvider } from "./context/RoleContext";
import { ThemeProvider } from "./context/ThemeContext";

/* ======================
   MOCK API
====================== */
jest.mock("./services/api", () => ({
  api: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
  },
}));

/* ======================
   MOCK SOCKET.IO
====================== */
jest.mock("socket.io-client", () => {
  return () => ({
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  });
});

/* ======================
   MOCK BOARD
====================== */
jest.mock("./components/Board", () => {
  return function MockBoard() {
    return <div data-testid="board">Board Loaded</div>;
  };
});

/* ======================
   SILENCE CONSOLE
====================== */
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
  console.error.mockRestore();
});

test("renders Kanban Board title", () => {
  render(
    <ThemeProvider>
      <RoleProvider>
        <App />
      </RoleProvider>
    </ThemeProvider>
  );

  expect(screen.getByText(/Kanban Board/i)).toBeInTheDocument();
  expect(screen.getByTestId("board")).toBeInTheDocument();
});
