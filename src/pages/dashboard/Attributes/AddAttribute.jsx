import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import CancelButton from "../../../components/CancelButton";
import SubmitButton from "../../../components/SubmitButton";
import InputTextBlock from "../../../components/InputTextBlock";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import { v4 as uuidv4 } from "uuid";

const AddAttribute = () => {
  const [name, setName] = useState(null);
  const [attributeValues, setAttributeValues] = useState([]);
  const navigate = useNavigate();
  const returnUrl = "/dashboard/attributes";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post("/attributes", {
      name: name,
      values: attributeValues.map((item) => item.name),
    });

    if (
      response.status === 404 ||
      response.status === 400 ||
      response.status === 500
    ) {
      return toast.error(
        response.response.data.error
          ? response.response.data.error
          : response.message
      );
    }
    toast.success(`New attribute created!`);

    navigate(returnUrl);
  };

  const addAttributeValue = (e) => {
    e.preventDefault();
    setAttributeValues((prev) => [...prev, { id: uuidv4(), name: "" }]);
  };

  const updateAttributeValue = (id, value) => {
    setAttributeValues((prev) =>
      prev.map((option) => {
        return option.id === id ? { ...option, name: value } : option;
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
          <span className="text-lg font-bold">Add new attribute</span>
        </div>
        <form onSubmit={handleSubmit}>
          <InputTextBlock name="name" setValue={setName} />
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
          <hr className="mb-4" />
          <SubmitButton />
          <CancelButton redirect={returnUrl} />
        </form>
      </div>
    </>
  );
};

export default AddAttribute;
