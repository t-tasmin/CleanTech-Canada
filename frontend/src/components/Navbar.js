import React from "react";
import "./Navbar.css";

const Navbar = () => {
  const currentPath = window.location.pathname;

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/demand", label: "Demand" },
    { path: "/supply", label: "Supply" },
    { path: "/calculator", label: "Calculator" },
    { path: "/about", label: "About" }
  ];

  const isActive = (path) => currentPath === path;

  return (
    <div className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <a href="/" className="navbar-logo">
          <div className="logo-icon">
            ⚡
          </div>
          <div>
            <h1 className="logo-text">
              CleanTech Ontario
            </h1>
          </div>
        </a>

        {/* Navigation */}
        <div className="navbar-links">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`nav-link ${isActive(item.path) ? 'nav-link-active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;