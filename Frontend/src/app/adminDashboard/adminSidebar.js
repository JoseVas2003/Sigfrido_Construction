"use client";
import Link from "next/link";
import { useState } from "react";
import '../Assets/css/adminSidebar.modules.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "Collapse" : "Expand"}
      </button>
      {isOpen && (
        <div className="sidebar-content">
          <h2>Welcome, Sigfrido</h2>
          <ul className="sidebar-links">
            <li><Link href="/adminDashboard">Dashboard</Link></li>
            <li><Link href="/messages">Messages</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/settings">Settings</Link></li>
            <li><Link href="/reviews">Reviews</Link></li>
            <li><Link href="/upload-photos">Upload Photos</Link></li>
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
