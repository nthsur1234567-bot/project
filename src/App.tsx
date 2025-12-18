import React from "react"; // comment: react import
import { Routes, Route, Navigate } from "react-router-dom"; // comment: routing components
import Header from "./components/Header"; // comment: global header with AppBar + Drawer

import Home from "./pages/Home"; // comment: home page
import Management from "./pages/Management"; // comment: users management page (current)
import Forms from "./pages/Forms"; // comment: forms page
import Help from "./pages/Help"; // comment: help page

import Courses from "./pages/Courses"; // comment: courses page (placeholder for now)
import Teachers from "./pages/Teachers"; // comment: teachers page (placeholder for now)
import Files from "./pages/Files"; // comment: files page (placeholder for now)
import Login from "./pages/Login"; // comment: login/logout page (placeholder for now)

const App: React.FC = () => { // comment: app root component
  return ( // comment: render app shell
    <> {/* comment: wrapper without extra div */}
      <Header /> {/* comment: header appears on every page */}

      <Routes> {/* comment: define all routes */}
        <Route path="/" element={<Home />} /> {/* comment: home route */}
        <Route path="/management" element={<Management />} /> {/* comment: management route */}
        <Route path="/forms" element={<Forms />} /> {/* comment: forms route */}
        <Route path="/help" element={<Help />} /> {/* comment: help route */}

        <Route path="/courses" element={<Courses />} /> {/* comment: courses route */}
        <Route path="/teachers" element={<Teachers />} /> {/* comment: teachers route */}
        <Route path="/files" element={<Files />} /> {/* comment: files route */}
        <Route path="/login" element={<Login />} /> {/* comment: login route */}

        <Route path="*" element={<Navigate to="/" replace />} /> {/* comment: redirect unknown routes to home */}
      </Routes> {/* comment: end routes */}
    </> // comment: end wrapper
  ); // comment: end return
}; // comment: end component

export default App; // comment: export app
