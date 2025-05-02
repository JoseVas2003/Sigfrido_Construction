"use client";
import { useState } from "react";
import { FaCalendarAlt, FaEnvelope, FaHammer, FaStar, FaUsers } from "react-icons/fa";
import "../Assets/css/adminSidebar.modules.css";

const translations = {
  en: {
    welcome: "Welcome, Sigfrido",
    reviews: "Reviews",
    appointments: "Appointments",
    projects: "Projects",
    users: "Users",
    menu: "Menu",
    language: "Language",
    contactForms: "Contact Forms",
    toggleLang: "English",
    addProject: "Add Project",
  },
  es: {
    welcome: "Bienvenido, Sigfrido",
    reviews: "Reseñas",
    appointments: "Citas",
    projects: "Proyectos",
    users: "Usuarios",
    menu: "Menú",
    language: "Idioma",
    contactForms: "Formularios",
    toggleLang: "Español",
    addProject: "Agregar Proyecto",
  },
};

const Sidebar = ({ onToggleLanguage}) => {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const handleToggleLanguage = () => {
    const newLang = language === "en" ? "es" : "en";
    setLanguage(newLang);
    onToggleLanguage(newLang);
  };

  return (
    <aside className="sidebar">
  <div className="sidebar-content">
    <h1 className="sidebar-title">{t.welcome}</h1>
    <p className="menu-label">{t.menu}</p>
    <ul className="sidebar-links">
      <li>
        <a href="#reviewsSection">
          <FaStar className="icon" />
          {t.reviews}
        </a>
      </li>
      <li>
        <a href="#appointmentsSection">
          <FaCalendarAlt className="icon" />
          {t.appointments}
        </a>
      </li>
      <li>
        <a href="#projectsSection">
          <FaHammer className="icon" />
          {t.projects}
        </a>
      </li>
      <li>
        <a id="usersSect" href="#usersSection">
          <FaUsers className="icon" />
          {t.users}
        </a>
      </li>
      <li>
        <a id="contactSect" href="#contactFormsSection">
          <FaEnvelope className="icon" />
          {t.contactForms}
        </a>
      </li>
    </ul>

    <p className="menu-label">{t.language}</p>
    <div className="sidebar-buttons">
      <button onClick={handleToggleLanguage} className="lang-btn">{t.toggleLang}</button>
    </div>
  </div>
</aside>
  );
};

export default Sidebar;