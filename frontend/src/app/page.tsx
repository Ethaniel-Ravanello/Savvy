"use client";
import React, { useState } from "react";
import Link from "next/link";

import Charts from "./Components/Chart";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";

import { TbCash, TbCashOff } from "react-icons/tb";
import { BiDollarCircle } from "react-icons/bi";
import {
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <GiHamburgerMenu
        onClick={() => setIsOpen(!isOpen)}
        className="text-white w-8 h-8 absolute z-10 -mt-3 md:mt-5 ml-5 lg:hidden"
      />
      <div
        className={
          isOpen
            ? "fixed top-0 -mt-[2rem] inset-0 duration-300 z-20"
            : "fixed top-0 -mt-[2rem] left-[-300px] duration-300 z-20"
        }
      >
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="md:p-3 lg:flex  mx-auto">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div>
          <div className="xl:ml-7 mt-8 md:mt-0 md:flex md:mx-auto">
            <div className="mx-auto align-middle mb-5 hidden md:flex items-center lg:ml-7 mt-10">
              <Charts />
            </div>

            <div className="w-full px-3 xl:ml-8">
              <div className="w-fit mx-auto text-white mb-5 md:hidden">
                <p className="text-xl text-center text-white/40">
                  Total Balance
                </p>
                <p className="text-3xl text-center">Rp. 1.250.000</p>
              </div>
              <div className=" text-white flex flex-wrap justify-around bg-Highlight p-2 rounded-[20px] w-full">
                <div className="pt-2 w-fit flex">
                  <div className="bg-[#222222] rounded-full my-auto p-1 mr-2">
                    <AiOutlineArrowUp className="my-auto w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h2 className="text-sm md:text-md mb-1">Total Income</h2>
                    <p className="md:text-2xl font-semibold">6.250.000</p>
                  </div>
                </div>

                <div className="pt-2 w-fit flex">
                  <div className="bg-[#222222] rounded-full my-auto p-1 mr-2">
                    <AiOutlineArrowDown className="my-auto w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h2 className="text-sm md:text-md mb-1">Total Expense</h2>
                    <p className="md:text-2xl font-semibold">1.250.000</p>
                  </div>
                </div>
              </div>

              <div className=" bg-Highlight rounded-[20px] mt-3 px-3 pb-3 pt-5 w-full">
                <h2 className="text-white text-xl mb-5 md:mb-1">
                  Latest Transaction
                </h2>
                <div className="md:flex md:flex-wrap">
                  <div className="flex  md:m-5">
                    <TbCash className="text-white w-12 h-12" />
                    <div className="text-white ml-5">
                      <p className="text-[#616161]">Income</p>
                      <p>IDR 5.000.000</p>
                    </div>
                  </div>

                  <div className="flex my-5  md:mb-0 md:m-5">
                    <TbCashOff className="text-white w-12 h-12" />
                    <div className="text-white ml-5">
                      <p className="text-[#616161]">Expenses</p>
                      <p>IDR 5.000.000</p>
                    </div>
                  </div>

                  <div className="flex mb-5 md:mb-0 md:m-5">
                    <TbCash className="text-white w-12 h-12" />
                    <div className="text-white ml-5">
                      <p className="text-[#616161]">Income</p>
                      <p>IDR 5.000.000</p>
                    </div>
                  </div>

                  <div className="flex  md:m-5">
                    <TbCashOff className="text-white w-12 h-12" />
                    <div className="text-white ml-5">
                      <p className="text-[#616161]">Expenses</p>
                      <p>IDR 5.000.000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:flex md:justify-between text-white h-[36%] mt-3 lg:md-5">
            <div className="xl:ml-7 px-3 lg:px-0 lg:pl-3 md:w-[35%] mb-5">
              <Link href="/income">
                <div className="bg-Highlight p-5 rounded-[20px] text-white lg:mt-2 flex">
                  <BiDollarCircle className="w-8 h-8 text-Success mr-3" />
                  <p className="pt-1 hover:underline">Add New Income</p>
                </div>
              </Link>

              <Link href="/income">
                <div className="bg-Highlight p-5 rounded-[20px] text-white mt-5 xl:mt-10 flex">
                  <BiDollarCircle className="w-8 h-8 text-red-800  mr-3" />
                  <p className="pt-1 hover:underline">Add New Expenses</p>
                </div>
              </Link>
            </div>

            <div className="px-3 lg:pr-3 lg:px-0 mb-5  md:flex md:justify-between md:w-[65%] md:ml-5">
              <div className="bg-Highlight rounded-[20px] p-4 mb-5 md:mb-0 md:w-full md:mr-4">
                <div className="flex w-full justify-between">
                  <p className="lg:text-xl font-semibold -mt-1.5 md:pt-1">
                    Latest Incomes
                  </p>
                  <div className="rounded-full bg-[#222222] text-end p-2 -mt-2 cursor-pointer">
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

              <div className="bg-Highlight rounded-[20px] p-4 md:w-full md:ml-4">
                <div className="flex w-full justify-between">
                  <p className="lg:text-xl font-semibold -mt-1.5 md:pt-1">
                    Latest Expenses
                  </p>
                  <div className="rounded-full bg-[#222222] text-end p-2 -mt-2 cursor-pointer">
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
      </div>
    </>
  );
};

export default page;
