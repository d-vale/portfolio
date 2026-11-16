"use client";
import React, { useState, useEffect } from "react";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { prefersReducedMotion } from "@/lib/gsap";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Le thème est déjà posé sur <html> par le script inline du layout
    setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
  }, []);

  const toggleTheme = (e) => {
    const newTheme = isDark ? "light" : "dark";
    const apply = () => {
      document.documentElement.setAttribute("data-theme", newTheme);
      try {
        localStorage.setItem("theme", newTheme);
      } catch (err) {
        /* stockage indisponible */
      }
    };
    setIsDark(!isDark);

    // Révélation circulaire depuis le bouton (View Transitions), sinon bascule simple
    if (!document.startViewTransition || prefersReducedMotion()) {
      apply();
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${rect.left + rect.width / 2}px`);
    root.style.setProperty("--vt-y", `${rect.top + rect.height / 2}px`);
    root.classList.add("theme-switching");
    const transition = document.startViewTransition(apply);
    transition.finished.finally(() => root.classList.remove("theme-switching"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      title={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
    >
      {isDark ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
    </button>
  );
};

export default ThemeToggle;
