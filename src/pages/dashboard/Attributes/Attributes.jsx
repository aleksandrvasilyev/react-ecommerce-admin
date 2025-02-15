import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import ElementsTable from "../../../components/ElementsTable";

export const attributesLoader = async ({ params }) => {
  const response = await api.get("/attributes");
  return response.data;
};

const Attributes = () => {
  const loadedData = useLoaderData();
  const [data, setData] = useState(loadedData);

  return (
    <>
      <ElementsTable
        modelSingle="attribute"
        modelPlural="attributes"
        data={data}
        setData={setData}
      />
    </>
  );
};

export default Attributes;
