import { createRoot } from "react-dom/client";
import { App } from "./app";

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container to render to.");
}

const root = createRoot(container);
root.render(<App />);
