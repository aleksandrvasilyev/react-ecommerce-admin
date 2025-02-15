import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import CancelButton from "../../../components/CancelButton";
import SubmitButton from "../../../components/SubmitButton";
import InputTextBlock from "../../../components/InputTextBlock";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [name, setName] = useState(null);
  const navigate = useNavigate();
  const returnUrl = "/dashboard/categories";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post("/categories", { name });
    if (response.status === 404 || response.status === 400) {
      return toast.error(
        response.response.data.error
          ? response.response.data.error
          : response.message
      );
    }
    navigate(returnUrl);
  };

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="mb-4">
          <span className="text-lg font-bold">Add new category</span>
        </div>
        <form onSubmit={handleSubmit}>
          <InputTextBlock name="name" setValue={setName} />
          <SubmitButton />
          <CancelButton redirect={returnUrl} />
        </form>
      </div>
    </>
  );
};

export default AddCategory;
