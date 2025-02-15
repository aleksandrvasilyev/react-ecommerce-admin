import { useState, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import CancelButton from "../../../components/CancelButton";
import SubmitButton from "../../../components/SubmitButton";
import Button from "../../../components/Button";
import InputTextBlock from "../../../components/InputTextBlock";
import TextareaBlock from "../../../components/TextareaBlock";
import InputNumberBlock from "../../../components/InputNumberBlock";
import SelectBlock from "../../../components/SelectBlock";
import { v4 as uuidv4 } from "uuid";
import ImageUploaderBlock from "../../../components/ImageUploaderBlock";
import InputStockBlock from "../../../components/InputStockBlock";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

export const addProductLoader = async ({ params }) => {
  const categoriesResponse = await api.get("/categories");
  const categories = categoriesResponse.data;

  const attributesResponse = await api.get("/attributes");
  const attributesList = attributesResponse.data;

  const allAttributeValues = attributesList.reduce((result, attribute) => {
    result[attribute.name] = attribute.values.map((value) => value.value);
    return result;
  }, {});

  return { categories, allAttributeValues };
};

const AddProduct = () => {
  const { categories, allAttributeValues } = useLoaderData();
  const attributes = Object.keys(allAttributeValues);

  const quantityRefs = useRef([]);
  const [name, setName] = useState(null);
  const [body, setBody] = useState(null);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(null);
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedAttributeValues, setSelectedAttributeValues] = useState([]);
  const [specifyAttributes, setSpecifyAttributes] = useState(false);

  const navigate = useNavigate();
  const returnUrl = "/dashboard/products";

  const handleSelectAttributeValues = (e, attribute) => {
    if (selectedAttributeValues.includes(attribute)) {
      setSelectedAttributeValues(
        selectedAttributeValues.filter((el) => el !== attribute)
      );
    } else {
      setSelectedAttributeValues((prev) => [...prev, attribute]);
    }

    setOptions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      "name: ",
      name,
      "body:",
      body,
      "price:",
      price,
      "category:",
      category,
      "stock:",
      stock,
      "images:",
      images
    );

    // const response = await api.post("/products", {
    //   name,
    //   body,
    //   price,
    //   category,
    // });
    // if (response.status === 404 || response.status === 400) {
    //   return console.log("Error", response.message);
    // }
    // navigate(returnUrl);
  };

  const handleAddOption = (e) => {
    e.preventDefault();
    const optionKeys = selectedAttributeValues.reduce(
      (acc, key) => ({ ...acc, [key]: "" }),
      {}
    );
    setOptions((prev) => [
      ...prev,
      { id: uuidv4(), ...optionKeys, quantity: 0, price: "" },
    ]);
  };

  const handleDeleteOption = (e, id) => {
    e.preventDefault();
    setOptions((prev) => prev.filter((option) => option.id !== id));
  };

  const handleOptionsChange = (id, attribute, value) => {
    setOptions((prev) =>
      prev.map((option) => {
        return option.id === id ? { ...option, [attribute]: value } : option;
      })
    );
  };

  const handleSetInfinitelyQuantity = (e, id) => {
    const currentOption = options.find((option) => option.id === id);

    const value = currentOption.quantity !== -1 ? -1 : 0;
    setOptions((prev) =>
      prev.map((option) => {
        return option.id === id ? { ...option, quantity: value } : option;
      })
    );

    const inputRef = quantityRefs.current[id];

    if (inputRef) {
      if (value === -1) {
        inputRef.disabled = true;
        inputRef.placeholder = "Infinitely";
      } else {
        inputRef.disabled = false;
        inputRef.placeholder = "Quantity";
      }
    }
  };

  const handleSpecifyAttributes = (e) => {
    e.preventDefault();
    setSpecifyAttributes(!specifyAttributes);
    if (options) setOptions([]);
  };

  // console.log("options", options);

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="mb-4">
          <span className="text-lg font-bold">Add new product</span>
        </div>
        <form>
          <div className="flex flex-wrap items-top">
            <div className="md:w-1/2 w-full">
              <InputTextBlock name="name" setValue={setName} />
              <TextareaBlock name="body" setValue={setBody} />
              <InputNumberBlock name="price" setValue={setPrice} />
              <SelectBlock
                name="category"
                setValue={setCategory}
                value={categories}
              />
            </div>
            <div className="md:w-1/2 w-full md:pl-2">
              <ImageUploaderBlock images={images} setImages={setImages} />
            </div>
          </div>

          <h2 className={`mt-6 ${options.length ? "mb-4" : "mb-0"}`}>
            Stock & Pricing
          </h2>

          {options.length === 0 && (
            <InputStockBlock stock={stock} setStock={setStock} />
          )}

          <Button
            name={
              <div className="flex items-center gap-2">
                Specify Attributes
                {specifyAttributes ? (
                  <FaArrowAltCircleUp />
                ) : (
                  <FaArrowAltCircleDown />
                )}
              </div>
            }
            handleClick={(e) => handleSpecifyAttributes(e)}
            isActive={specifyAttributes}
          />

          {specifyAttributes && (
            <>
              <div className="overflow-x-auto mb-4">
                <div className="mb-6">
                  <fieldset className="border border-solid border-gray-300 p-3 bg-white">
                    <legend className="text-sm">Specify attributes</legend>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                      {attributes.map((attribute, i) => (
                        <li
                          className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r"
                          key={i}
                        >
                          <div className="flex items-center ps-3 hover:bg-gray-100 cursor-pointer">
                            <input
                              id={attribute}
                              name={attribute}
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                              onClick={(e) =>
                                handleSelectAttributeValues(e, attribute)
                              }
                            />
                            <label
                              htmlFor={attribute}
                              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                            >
                              {attribute}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </fieldset>
                </div>
                <table className="w-full mb-4 border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      {selectedAttributeValues.map((attribute, i) => (
                        <th className="border border-gray-300 p-2" key={i}>
                          {attribute}
                        </th>
                      ))}

                      <th className="border border-gray-300 p-2">Quantity</th>
                      <th className="border border-gray-300 p-2">Price</th>
                      <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {options.map((option) => (
                      <tr key={option.id}>
                        {selectedAttributeValues.map((attribute, i) => (
                          <td className="border border-gray-300 p-2" key={i}>
                            <select
                              className="w-full p-2 border rounded-md"
                              onChange={(e) =>
                                handleOptionsChange(
                                  option.id,
                                  attribute,
                                  e.target.value
                                )
                              }
                            >
                              <option>Select</option>
                              {allAttributeValues[attribute].map((value, j) => (
                                <option key={j}>{value}</option>
                              ))}
                            </select>
                          </td>
                        ))}
                        <td className="border border-gray-300 p-2 ">
                          <div className="flex items-center">
                            <input
                              ref={(el) =>
                                (quantityRefs.current[option.id] = el)
                              }
                              type="number"
                              onChange={(e) =>
                                handleOptionsChange(
                                  option.id,
                                  "quantity",
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border rounded-lg"
                              placeholder="Quantity"
                            />

                            <input
                              id={`infinitely-${option.id}`}
                              name={`infinitely-${option.id}`}
                              type="checkbox"
                              className="w-4 h-4 ml-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                              onClick={(e) =>
                                handleSetInfinitelyQuantity(e, option.id)
                              }
                            />
                            <label
                              htmlFor={`infinitely-${option.id}`}
                              className="py-3 ms-2 text-sm font-medium text-gray-900"
                            >
                              Infinitely
                            </label>
                          </div>
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            onChange={(e) =>
                              handleOptionsChange(
                                option.id,
                                "price",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded-lg"
                            placeholder="Price"
                          />
                        </td>

                        <td className="border border-gray-300 p-2 text-center">
                          <button
                            onClick={(e) => handleDeleteOption(e, option.id)}
                            className="py-1 px-2 bg-red-500 text-white rounded-lg"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button name="Add Option Row" handleClick={handleAddOption} />
            </>
          )}
          <hr className="mt-12 mb-6" />
          <SubmitButton handleSubmit={handleSubmit} />
          <CancelButton redirect={returnUrl} />
        </form>
      </div>
    </>
  );
};

export default AddProduct;
