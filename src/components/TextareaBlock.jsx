import React from "react";

const TextareaBlock = ({ name, setValue, value }) => {
  return (
    <>
      <label className="block text-left mb-2 mt-8" htmlFor={name}>
        {name}
      </label>
      <textarea
        onChange={(e) => setValue(e.target.value)}
        className="py-3 px-4 h-36 block w-full border border-gray-300 rounded-lg focus:border-gray-500 mb-4"
        placeholder={`Enter ${name}...`}
        name={name}
        id={name}
        {...(value !== undefined && { value })}
      ></textarea>
    </>
  );
};

export default TextareaBlock;
