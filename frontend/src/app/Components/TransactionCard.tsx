import React from "react";

import { TbCash, TbCashOff } from "react-icons/tb";

interface Data {
  type: string;
  amount: number;
}

const TransactionCard = ({ type, amount }: Data) => {
  return (
    <div className="flex">
      {type === "Income" ? (
        <TbCash className="text-white w-12 h-12" />
      ) : (
        <TbCashOff className="text-white w-12 h-12" />
      )}
      <div className="text-white ml-5">
        <p className="text-[#616161]">{type}</p>
        <p>{amount}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
