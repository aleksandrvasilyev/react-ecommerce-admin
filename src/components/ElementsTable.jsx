import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import api from "../utils/axiosInstance";
import { toast } from "react-toastify";
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString();
};

function capitalize(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ElementsTable = ({ modelSingle, modelPlural, data, setData }) => {
  const modelSingleCapital = capitalize(modelSingle);
  const modelPluralCapital = capitalize(modelPlural);

  const handleDelete = async (e, uuid) => {
    const confirm = window.confirm("Do you want to delete this?");
    if (!confirm) return;

    try {
      await api.delete(`/${modelPlural}/${uuid}`);
      toast.success(`${modelSingle} deleted!`);

      setData((prev) => prev.filter((object) => object.uuid !== uuid));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-left">
          <div className="text-lg font-bold mb-1">{modelPluralCapital}</div>
          <div className="text-sm">
            {data.length} {modelSingle}(s)
          </div>
        </span>
        <span className="text-right">
          <Link
            to={`/dashboard/${modelPlural}/add`}
            className="block px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Add new {modelSingle}
          </Link>
        </span>
      </div>
      {data.length > 0 ? (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  {modelSingleCapital} name
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  {modelSingleCapital} body
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Created
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((element, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/dashboard/${modelPlural}/${element.uuid}`}
                        className="text-blue-500 hover:underline"
                      >
                        {element.name}
                      </Link>
                    </td>
                    {/* <td className="px-6 py-4">{element.body}</td> */}
                    <td className="px-6 py-4">
                      {formatDate(element.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/dashboard/${modelPlural}/${element.uuid}`}>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-3">
                          <FiEdit />
                        </button>
                      </Link>
                      <button
                        onClick={(e) => handleDelete(e, element.uuid)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        `${modelPluralCapital} Not Found!`
      )}
    </div>
  );
};

export default ElementsTable;
