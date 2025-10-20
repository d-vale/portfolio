"use client";
import React, { useState, useEffect } from "react";
import { RiMoonLine, RiSunLine } from "@remixicon/react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Charger le thème depuis localStorage au montage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label="Toggle theme"
      title={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
    >
      {isDark ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
    </button>
  );
};

export default ThemeToggle;
