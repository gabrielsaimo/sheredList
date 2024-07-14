import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Rotutes from "./routes/Rotutes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Rotutes />
  </BrowserRouter>
);
