import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import CancelButton from "../../../components/CancelButton";
import SubmitButton from "../../../components/SubmitButton";
import InputTextBlock from "../../../components/InputTextBlock";
import TextareaBlock from "../../../components/TextareaBlock";
import { toast } from "react-toastify";

const AddPage = () => {
  const [name, setName] = useState(null);
  const [body, setBody] = useState(null);
  const navigate = useNavigate();
  const returnUrl = "/dashboard/pages";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post("/pages", { name, body });
    if (response.status === 404 || response.status === 400) {
      return toast.error(
        response.response.data.error
          ? response.response.data.error
          : response.message
      );
    }
    toast.success(`New page created!`);

    navigate(returnUrl);
  };

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="mb-4">
          <span className="text-lg font-bold">Add new page</span>
        </div>
        <form onSubmit={handleSubmit}>
          <InputTextBlock name="name" setValue={setName} />
          <TextareaBlock name="body" setValue={setBody} />
          <SubmitButton />
          <CancelButton redirect={returnUrl} />
        </form>
      </div>
    </>
  );
};

export default AddPage;
