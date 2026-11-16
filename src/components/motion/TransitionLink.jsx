"use client";
import React from "react";
import Link from "next/link";
import { useMotion } from "./MotionProvider";

/**
 * Lien interne qui joue la transition de page (rideau) avant de naviguer.
 * `label` : texte affiché sur le rideau pendant la transition.
 */
const TransitionLink = ({ href, label, onClick, children, ...rest }) => {
  const { navigate } = useMotion();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === "_blank" ||
      typeof href !== "string" ||
      !href.startsWith("/")
    ) {
      return;
    }
    e.preventDefault();
    navigate(href, label);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

export default TransitionLink;
