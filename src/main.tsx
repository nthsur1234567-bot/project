import React from "react"; // ייבוא React
import ReactDOM from "react-dom/client"; // ייבוא ReactDOM ליצירת root
import App from "./App.tsx"; // ייבוא קומפוננטת השורש App
import "./index.css"; // ייבוא עיצוב כללי
import { BrowserRouter } from "react-router-dom"; // ייבוא BrowserRouter לראוטינג

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement // יצירת root מתוך האלמנט עם id="root"
).render(
  <React.StrictMode> 
    <BrowserRouter> 
      <App /> 
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
