import React from "react"; // comment: react import
import ReactDOM from "react-dom/client"; // comment: react dom root
import { BrowserRouter } from "react-router-dom"; // comment: router wrapper
import { ThemeProvider } from "@mui/material/styles"; // comment: theme provider
import CssBaseline from "@mui/material/CssBaseline"; // comment: normalize css
import App from "./App"; // comment: app component
import theme from "./theme/theme"; // comment: custom theme
import "./index.css"; // comment: global css

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render( // comment: create root
  <React.StrictMode> {/* comment: strict mode */}
    <BrowserRouter> {/* comment: router wrapper */}
      <ThemeProvider theme={theme}> {/* comment: provide MUI theme */}
        <CssBaseline /> {/* comment: baseline styles */}
        <App /> {/* comment: render app */}
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

