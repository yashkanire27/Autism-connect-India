import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const changeLanguage = (e) => i18n.changeLanguage(e.target.value);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">Autism Connect India</Link>
        <ul className="navbar-links">
          <li><Link to="/">{t("nav_home")}</Link></li>
          <li><Link to="/activities">{t("nav_activities")}</Link></li>
          <li><Link to="/consultants">{t("nav_consultants")}</Link></li>
          <li><Link to="/donate">{t("nav_donate")}</Link></li>
          <li><Link to="/contact">{t("nav_contact")}</Link></li>
          <li>
            <select onChange={changeLanguage} defaultValue="en" aria-label="Select language">
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>
          </li>
          <li>
            <button className="btn btn-secondary" onClick={toggleTheme} style={{ padding: "6px 14px" }}>
              {dark ? "☀️" : "🌙"}
            </button>
          </li>
          {isAuthenticated ? (
            <>
              <li><Link to="/dashboard">{user.fullName}</Link></li>
              <li><button className="btn btn-primary" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">{t("nav_login")}</Link></li>
              <li><Link to="/register" className="btn btn-primary">{t("nav_register")}</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
