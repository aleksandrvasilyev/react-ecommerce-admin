import { useNavigate } from "react-router-dom";

const CancelButton = ({ redirect }) => {
  const navigate = useNavigate();

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(redirect);
  };

  return (
    <button
      onClick={handleCancel}
      className="px-4 py-2 text-red-500 hover:underline"
    >
      Cancel
    </button>
  );
};

export default CancelButton;
