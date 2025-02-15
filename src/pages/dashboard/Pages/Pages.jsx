import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import ElementsTable from "../../../components/ElementsTable";

export const pagesLoader = async ({ params }) => {
  const response = await api.get("/pages");
  return response.data;
};

const Pages = () => {
  const loadedData = useLoaderData();
  const [data, setData] = useState(loadedData);

  return (
    <>
      <ElementsTable
        modelSingle="page"
        modelPlural="pages"
        data={data}
        setData={setData}
      />
    </>
  );
};

export default Pages;
