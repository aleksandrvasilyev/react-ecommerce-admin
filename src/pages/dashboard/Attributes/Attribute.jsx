import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import InputTextBlock from "../../../components/InputTextBlock";
import TextareaBlock from "../../../components/TextareaBlock";
import SubmitButton from "../../../components/SubmitButton";
import CancelButton from "../../../components/CancelButton";
import Button from "../../../components/Button";
import { v4 as uuidv4 } from "uuid";

export const attributeLoader = async ({ params }) => {
  const response = await api.get(`/attributes/${params.uuid}`);
  return response.data;
};

const Attribute = () => {
  const data = useLoaderData();
  const attributeValuesInitial = data.values.map(({ uuid, value }) => ({
    id: uuid,
    value,
  }));
  const [name, setName] = useState(data.name);
  const [attributeValues, setAttributeValues] = useState(
    attributeValuesInitial
  );
  const navigate = useNavigate();
  const { uuid } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.put(`/attributes/${uuid}`, {
      name: name,
      values: attributeValues.map(({ id, value }) => ({
        uuid: id,
        value,
      })),
    });
    navigate("/dashboard/attributes");
  };

  const addAttributeValue = (e) => {
    e.preventDefault();
    setAttributeValues((prev) => [...prev, { id: uuidv4(), name: "" }]);
  };

  const updateAttributeValue = (id, value) => {
    setAttributeValues((prev) =>
      prev.map((option) => {
        return option.id === id ? { ...option, value: value } : option;
      })
    );
  };

  const deleteAttributeValue = (e, id) => {
    e.preventDefault();
    setAttributeValues((prev) => prev.filter((option) => option.id !== id));
  };

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="mb-4">
          <span className="text-lg font-bold">Edit attribute</span>
        </div>
        <form onSubmit={handleSubmit}>
          <InputTextBlock name="name" setValue={setName} value={name} />
          <div>
            <Button
              name="Add option"
              handleClick={(e) => addAttributeValue(e)}
            />
          </div>
          <div className="mb-10">
            {attributeValues.map((el) => (
              <div className="flex items-center mb-2" key={el.id}>
                <div>
                  <input
                    onChange={(e) =>
                      updateAttributeValue(el.id, e.target.value)
                    }
                    className="py-3 px-4 block w-full border border-gray-300 rounded-lg focus:border-gray-500"
                    type="text"
                    placeholder={`Enter option value...`}
                    value={el.value}
                  ></input>
                </div>
                <div>
                  <div
                    className="block ml-4 px-4 py-2 rounded-md bg-red-400 text-white hover:bg-red-500 cursor-pointer"
                    onClick={(e) => deleteAttributeValue(e, el.id)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))}
          </div>
          <SubmitButton />
          <CancelButton redirect="/dashboard/attributes" />
        </form>
      </div>
    </>
  );
};

export default Attribute;
