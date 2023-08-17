import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap";
import "./scss/index.scss";

createRoot(document.getElementById("main")).render(<App />);