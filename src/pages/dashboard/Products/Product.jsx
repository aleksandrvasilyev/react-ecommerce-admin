import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import InputTextBlock from "../../../components/InputTextBlock";
import TextareaBlock from "../../../components/TextareaBlock";
import SubmitButton from "../../../components/SubmitButton";
import CancelButton from "../../../components/CancelButton";

export const productLoader = async ({ params }) => {
  const response = await api.get(`/products/${params.uuid}`);
  return response.data;
};

const Product = () => {
  const data = useLoaderData();
  const [name, setName] = useState(data.name);
  const navigate = useNavigate();
  const { uuid } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/products/${uuid}`, { name });
    navigate("/dashboard/products");
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="mb-4">
        <span className="text-lg font-bold">Edit product</span>
      </div>
      <form onSubmit={handleSubmit}>
        <InputTextBlock name="name" setValue={setName} value={name} />
        <SubmitButton />
        <CancelButton redirect="/dashboard/products" />
      </form>
    </div>
  );
};

export default Product;
