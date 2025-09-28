import React from "react";

const Button = ({ title, id, leftIcon, rightIcon, containerClass, href }) => {
  if (href) {
    return (
      <a
        href={href}
        id={id}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 ${containerClass}`}
      >
        {leftIcon}
        <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
          <div>{title}</div>
        </span>
        {rightIcon}
      </a>
    );
  }

  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 ${containerClass}`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
