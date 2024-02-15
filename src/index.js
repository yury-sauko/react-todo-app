import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import ToDoApp from "./components/ToDoApp/ToDoApp";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ToDoApp />
  </StrictMode>
);
