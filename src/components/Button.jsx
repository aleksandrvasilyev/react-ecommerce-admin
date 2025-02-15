import React from "react";

const Button = ({ name, handleClick, isActive }) => {
  return (
    <button
      onClick={handleClick}
      className={`block px-4 mb-12 py-2 text-gray-700 rounded-md hover:bg-gray-300 ${
        isActive ? "bg-gray-300" : "bg-gray-200"
      }`}
    >
      {name}
    </button>
  );
};

export default Button;
