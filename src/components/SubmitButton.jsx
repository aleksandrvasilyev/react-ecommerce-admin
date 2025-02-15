const SubmitButton = ({ handleSubmit }) => {
  return (
    <button
      type="submit"
      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
      onClick={handleSubmit}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
