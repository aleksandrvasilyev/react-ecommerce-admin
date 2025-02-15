import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ElementsTable from "../../../components/ElementsTable";
import api from "../../../utils/axiosInstance";

export const productsLoader = async ({ params }) => {
  const response = await api.get("/products");
  return response.data;
};

const Products = () => {
  const loadedData = useLoaderData();
  const [data, setData] = useState(loadedData);

  return (
    <>
      <ElementsTable
        modelSingle="product"
        modelPlural="products"
        data={data}
        setData={setData}
      />
    </>
  );
};

export default Products;
