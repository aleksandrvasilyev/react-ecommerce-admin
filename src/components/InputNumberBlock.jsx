const InputTextBlock = ({ name, setValue, value, isDisabled }) => {
  return (
    <>
      <label className="block text-left mb-2 mt-8" htmlFor={name}>
        {name}
      </label>
      <input
        onChange={(e) => setValue(e.target.value)}
        className={`py-3 px-4 block w-full border border-gray-300 rounded-lg focus:border-gray-500 mb-4`}
        type="number"
        placeholder={isDisabled ? "Infinitely" : `Enter ${name}...`}
        name={name}
        id={name}
        disabled={isDisabled}
        {...(value !== undefined && { value })}
      ></input>
    </>
  );
};

export default InputTextBlock;
