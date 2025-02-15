import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import InputTextBlock from "../../../components/InputTextBlock";
import SubmitButton from "../../../components/SubmitButton";
import CancelButton from "../../../components/CancelButton";

export const categoryLoader = async ({ params }) => {
  const response = await api.get(`/categories/${params.uuid}`);
  return response.data;
};

const Category = () => {
  const data = useLoaderData();
  const [name, setName] = useState(data.name);
  const navigate = useNavigate();
  const { uuid } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/categories/${uuid}`, { name });
    navigate("/dashboard/categories");
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="mb-4">
        <span className="text-lg font-bold">Edit category</span>
      </div>
      <form onSubmit={handleSubmit}>
        <InputTextBlock name="name" setValue={setName} value={name} />
        <SubmitButton />
        <CancelButton redirect="/dashboard/categories" />
      </form>
    </div>
  );
};

export default Category;
