import React from "react";

const SelectBlock = ({ name, setValue, value }) => {
  return (
    <>
      <label className="block text-left mb-2 mt-8" htmlFor={name}>
        {name}
      </label>
      <select
        onChange={(e) => setValue(e.target.value)}
        className="w-full mb-4 p-3 border rounded-lg"
        name={name}
        id={name}
      >
        <option value="">Select a {name}</option>
        {value.map((el, i) => (
          <option value={el.name} key={i}>
            {el.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectBlock;
