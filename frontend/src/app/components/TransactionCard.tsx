import React from "react";

import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";

interface Data {
  type: string;
  amount: number;
  name: string;
  description: string;
}

const TransactionCard = ({ type, amount, name, description }: Data) => {
  return (
    <div className="flex bg-Highlight rounded-xl p-3">
      {type === "Income" ? (
        <div className="bg-success-secondary rounded-full my-auto p-1 mr-2">
          <IoMdArrowRoundUp className="my-auto w-6 h-6 md:w-8 md:h-8 text-success font-bold" />
        </div>
      ) : (
        <div className="bg-red-700 rounded-full my-auto p-1 mr-2">
          <IoMdArrowRoundDown className="my-auto w-6 h-6 md:w-8 text-red-900 md:h-8" />
        </div>
      )}
      <div className="flex justify-between w-full">
        <div className="text-[#616161] ml-5 font-semibold">
          <p className="text-white font-semibold">{name}</p>
          <p>{description}</p>
        </div>
        <p className="text-slate-50 my-auto font-semibold">{amount}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
