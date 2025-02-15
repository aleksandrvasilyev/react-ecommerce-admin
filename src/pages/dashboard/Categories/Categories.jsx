import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ElementsTable from "../../../components/ElementsTable";
import api from "../../../utils/axiosInstance";

export const categoriesLoader = async ({ params }) => {
  const response = await api.get("/categories");
  return response.data;
};

const Categories = () => {
  const loadedData = useLoaderData();
  const [data, setData] = useState(loadedData);

  return (
    <>
      <ElementsTable
        modelSingle="category"
        modelPlural="categories"
        data={data}
        setData={setData}
      />
    </>
  );
};

export default Categories;
