import React from "react";

import { TbCurrencyDollar } from "react-icons/tb";
import { FaSackDollar } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { BiMessageRounded } from "react-icons/bi";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";

const HistoryCard = ({
  name,
  description,
  date,
  amount,
  incomeId,
  handleDelete,
  type,
}: any) => {
  console.log(incomeId);
  return (
    <div className="w-full bg-[#222222] h-fit  rounded-lg p-3 mb-3">
      <div className="flex justify-between">
        <div className="flex">
          <div>
            <FaSackDollar className="w-10 h-10 mt-2 mr-3" />
          </div>

          <div>
            <div className="flex mb-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  type === "Income" ? "bg-Success" : "bg-red-600"
                } mt-2 mx-2`}
              ></div>
              <p>{name}</p>
            </div>

            <div className="flex">
              <div className="flex">
                <p className="ml-2">{amount}</p>
              </div>

              <div className="flex ml-8">
                <SlCalender className="w-5 h-5 ml-0.5 mr-1.5 font-bold" />
                <p>{date}</p>
              </div>

              <div className="flex ml-8">
                <BiMessageRounded className="w-5 h-5 ml-0.5 mr-1.5 font-bold" />
                <p>{description.slice(0, 15) + "..."}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hover:bg-[#383838] px-3 rounded-lg hover:cursor-pointer">
          <BsFillTrashFill
            className="w-6 h-6 my-4 justify-end"
            onClick={() => handleDelete(incomeId)}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
