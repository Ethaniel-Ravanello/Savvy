import React from "react";
import Link from "next/link";

import Sidebar from "./Components/Sidebar";
import Charts from "./Components/Chart";

import { TbCash, TbCashOff } from "react-icons/tb";
import { BiDollarCircle } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";

const page = () => {
  return (
    <div className="flex p-3">
      <Sidebar />
      <div className="w-fit ml-16 mt-8">
        <Charts />

        <div className="mt-16">
          <Link href="/income">
            <div className="bg-Highlight p-5 rounded-[20px] text-white mt-10 flex">
              <BiDollarCircle className="w-8 h-8 text-Success mr-3" />
              <p className="pt-1 hover:underline">Add New Income</p>
            </div>
          </Link>

          <Link href="/income">
            <div className="bg-Highlight p-5 rounded-[20px] text-white mt-10 flex">
              <BiDollarCircle className="w-8 h-8 text-red-800  mr-3" />
              <p className="pt-1 hover:underline">Add New Expenses</p>
            </div>
          </Link>
        </div>
      </div>

      <div>
        <div className="h-[25%] text-white flex justify-around bg-Highlight p-5 ml-10 rounded-[20px] mt-4">
          <div className="pt-2">
            <h2 className="text-3xl mb-3">Total Income</h2>
            <p className="text-4xl font-semibold">Rp. 6.250.000</p>
          </div>
          <div className="pt-2">
            <h2 className="text-3xl mb-3">Total Expense</h2>
            <p className="text-4xl font-semibold">Rp. 6.250.000</p>
          </div>
        </div>

        <div className=" bg-Highlight rounded-[20px] mt-3 ml-10 h-[30%] flex flex-wrap">
          <div className="flex px-3 pb-3 pt-5">
            <TbCash className="text-white w-12 h-12" />
            <div className="text-white ml-5">
              <p className="text-[#616161]">Income</p>
              <p>IDR 5.000.000</p>
            </div>
          </div>

          <div className="flex px-3 pb-3 pt-5">
            <TbCashOff className="text-white w-12 h-12" />
            <div className="text-white ml-5">
              <p className="text-[#616161]">Expenses</p>
              <p>IDR 5.000.000</p>
            </div>
          </div>

          <div className="flex px-3 pb-3 pt-5">
            <TbCash className="text-white w-12 h-12" />
            <div className="text-white ml-5">
              <p className="text-[#616161]">Income</p>
              <p>IDR 5.000.000</p>
            </div>
          </div>

          <div className="flex px-3 pb-3 pt-5">
            <TbCashOff className="text-white w-12 h-12" />
            <div className="text-white ml-5">
              <p className="text-[#616161]">Expenses</p>
              <p>IDR 5.000.000</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between ml-10 text-white h-[36%] mt-3">
          <div className="bg-Highlight rounded-[20px] p-4">
            <div className="flex w-full justify-between">
              <p className="text-xl font-semibold -mt-1.5">Latest Incomes</p>
              <div className="rounded-full bg-[#222222] ml-14 p-2 -mt-2 cursor-pointer">
                <AiOutlineArrowRight className="w-5 h-5" />
              </div>
            </div>

            <div className="flex pb-3 pt-5">
              <TbCashOff className="text-white w-12 h-12" />
              <div className="text-white ml-5">
                <p className="text-[#616161]">Paycheck</p>
                <p>IDR 5.000.000</p>
              </div>
            </div>

            <div className="flex pb-3 pt-5">
              <TbCashOff className="text-white w-12 h-12" />
              <div className="text-white ml-5">
                <p className="text-[#616161]">Paycheck</p>
                <p>IDR 5.000.000</p>
              </div>
            </div>
          </div>
          <div className="bg-Highlight rounded-[20px] p-4">
            <div className="flex w-full justify-between">
              <p className="text-xl font-semibold -mt-1.5">Latest Expenses</p>
              <div className="rounded-full bg-[#222222] ml-14 p-2 -mt-2 cursor-pointer">
                <AiOutlineArrowRight className="w-5 h-5" />
              </div>
            </div>

            <div className="flex pb-3 pt-5">
              <TbCashOff className="text-white w-12 h-12" />
              <div className="text-white ml-5">
                <p className="text-[#616161]">Paycheck</p>
                <p>IDR 5.000.000</p>
              </div>
            </div>

            <div className="flex pb-3 pt-5">
              <TbCashOff className="text-white w-12 h-12" />
              <div className="text-white ml-5">
                <p className="text-[#616161]">Paycheck</p>
                <p>IDR 5.000.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
