import InputNumberBlock from "./InputNumberBlock";
import { useState } from "react";

const InputStockBlock = ({ stock, setStock }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSetInfiniteStock = () => {
    if (stock === -1) {
      setStock(null);
      setIsDisabled(false);
    } else {
      setStock(-1);
      setIsDisabled(true);
    }
  };

  return (
    <div className="flex items-center">
      <div className="w-full mr-4">
        <InputNumberBlock
          name="stock"
          setValue={setStock}
          isDisabled={isDisabled}
        />
      </div>
      <div className="mt-12 flex items-center mr-4">
        <input
          id="infiniteStock"
          name="stock"
          type="checkbox"
          className="w-4 h-4 ml-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          onClick={() => handleSetInfiniteStock()}
        />
        <label
          htmlFor="infiniteStock"
          className="py-3 ms-2 text-sm font-medium text-gray-900"
        >
          Infinitely
        </label>
      </div>
    </div>
  );
};

export default InputStockBlock;
