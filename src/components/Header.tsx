import React from "react"; // comment: react import
import { Link } from "react-router-dom"; // comment: link for navigation

const Header: React.FC = () => { // comment: header component
  return ( // comment: render header
    <nav style={{ display: "flex", gap: "12px", padding: "12px", borderBottom: "1px solid #ccc" }}> {/* comment: simple nav */}
      <Link to="/">Home</Link> {/* comment: home link */}
      <Link to="/management">Management</Link> {/* comment: management link */}
      <Link to="/forms">Forms</Link> {/* comment: forms link */}
      <Link to="/help">Help</Link> {/* comment: help link */}
    </nav> // comment: end nav
  ); // comment: end return
}; // comment: end component

export default Header; // comment: export
