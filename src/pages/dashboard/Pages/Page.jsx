import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import InputTextBlock from "../../../components/InputTextBlock";
import TextareaBlock from "../../../components/TextareaBlock";
import SubmitButton from "../../../components/SubmitButton";
import CancelButton from "../../../components/CancelButton";

export const pageLoader = async ({ params }) => {
  const response = await api.get(`/pages/${params.uuid}`);
  return response.data;
};

const Page = () => {
  const data = useLoaderData();
  const [name, setName] = useState(data.name);
  const [body, setBody] = useState(data.body);
  const navigate = useNavigate();
  const { uuid } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/pages/${uuid}`, { name, body });
    navigate("/dashboard/pages");
  };

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="mb-4">
          <span className="text-lg font-bold">Edit page</span>
        </div>
        <form onSubmit={handleSubmit}>
          <InputTextBlock name="name" setValue={setName} value={name} />
          <TextareaBlock name="body" setValue={setBody} value={body} />
          <SubmitButton />
          <CancelButton redirect="/dashboard/pages" />
        </form>
      </div>
    </>
  );
};

export default Page;
