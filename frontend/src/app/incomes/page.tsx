import React from "react";

import Layout from "../Components/Layout";

import { TbCurrencyDollar } from "react-icons/tb";
import { FaSackDollar } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { BiMessageRounded } from "react-icons/bi";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";

const page = () => {
  return (
    <Layout>
      <div className="text-white h-[calc(100vh-30px)] w-full overflow-y-auto bg-Highlight rounded-[30px] px-10 py-7 ml-5">
        <h1 className="text-2xl mb-5 font-semibold">Incomes</h1>
        <div className="w-full bg-[#222222] mb-5 rounded-lg py-3">
          <p className="text-center text-lg">Total Incomes: +Rp 6.250.000</p>
        </div>
        <div className="w-full bg-[#222222] "></div>
        <div className="flex">
          <div className="w-[30%]">
            <form>
              <div className="mb-6">
                <input
                  type="text"
                  id="name"
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Income Source"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="number"
                  id="amount"
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Income Amount"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="date"
                  id="Date"
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Income Date"
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  id="Description"
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Income Description"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Income
              </button>
            </form>
          </div>

          <div className="w-[70%] h-[65vh] overflow-y-scroll overflow-x-hidden ml-5 scrollbar-thin scrollbar-thumb-primary-400">
            <div className="w-full bg-[#222222] h-fit  rounded-lg p-3 mb-3">
              <div className="flex justify-between">
                <div className="flex">
                  <div>
                    <FaSackDollar className="w-10 h-10 mt-2 mr-3" />
                  </div>

                  <div>
                    <div className="flex mb-2">
                      <div className="w-2 h-2 rounded-full bg-Success mt-2 mx-2"></div>
                      <p>Hulo Hulo</p>
                    </div>

                    <div className="flex">
                      <div className="flex">
                        <TbCurrencyDollar className="w-5 h-5 ml-0.5 mr-1.5 font-bold mt-[1px]" />
                        <p>3000</p>
                      </div>

                      <div className="flex ml-8">
                        <SlCalender className="w-5 h-5 ml-0.5 mr-1.5 font-bold" />
                        <p>11-08-2023</p>
                      </div>

                      <div className="flex ml-8">
                        <BiMessageRounded className="w-5 h-5 ml-0.5 mr-1.5 font-bold" />
                        <p>Main Paycheck</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-x-6">
                  <BsPencilFill className="w-6 h-6 my-4 justify-end" />
                  <BsFillTrashFill className="w-6 h-6 my-4 justify-end" />
                </div>
              </div>
            </div>
            <div className="w-full bg-[#222222] h-fit  rounded-lg p-3 mb-3">
              <div className="flex justify-between">
                <div className="flex">
                  <div>
                    <FaSackDollar className="w-10 h-10 mt-2 mr-3" />
                  </div>

                  <div>
                    <div className="flex mb-2">
                      <div className="w-2 h-2 rounded-full bg-Success mt-2 mx-2"></div>
                      <p>Hulo Hulo</p>
                    </div>

                    <div className="flex">
                      <div className="flex">
                        <TbCurrencyDollar className="w-5 h-5 ml-0.5 mr-1.5 font-bold mt-[1px]" />
                        <p>3000</p>
                      </div>

                      <div className="flex ml-8">
                        <SlCalender className="w-5 h-5 ml-0.5 mr-1.5 font-bold" />
                        <p>11-08-2023</p>
                      </div>

                      <div className="flex ml-8">
                        <BiMessageRounded className="w-5 h-5 ml-0.5 mr-1.5 font-bold" />
                        <p>Main Paycheck</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-x-6">
                  <BsPencilFill className="w-6 h-6 my-4 justify-end" />
                  <BsFillTrashFill className="w-6 h-6 my-4 justify-end" />
                </div>
              </div>
            </div>
            <div className="w-full bg-[#222222] h-fit  rounded-lg p-3 mb-3">
              <div className="flex justify-between">
                <div className="flex">
                  <div>
                    <FaSackDollar className="w-10 h-10 mt-2 mr-3" />
                  </div>

                  <div>
                    <div className="flex mb-2">
                      <div className="w-2 h-2 rounded-full bg-Success mt-2 mx-2"></div>
                      <p>Hulo Hulo</p>
                    </div>

                    <div className="flex">
                      <div className="flex">
                        <TbCurrencyDollar className="w-5 h-5 ml-0.5 mr-1.5 font-bold mt-[1px]" />
                        <p>3000</p>
                      </div>

                      <div className="flex ml-8">
                        <SlCalender className="w-5 h-5 ml-0.5 mr-1.5 font-bold" />
                        <p>11-08-2023</p>
                      </div>

                      <div className="flex ml-8">
                        <BiMessageRounded className="w-5 h-5 ml-0.5 mr-1.5 font-bold" />
                        <p>Main Paycheck</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-x-6">
                  <BsPencilFill className="w-6 h-6 my-4 justify-end" />
                  <BsFillTrashFill className="w-6 h-6 my-4 justify-end" />
                </div>
              </div>
            </div>
            <div className="w-full bg-[#222222] h-fit  rounded-lg p-3 mb-3">
              <div className="flex justify-between">
                <div className="flex">
                  <div>
                    <FaSackDollar className="w-10 h-10 mt-2 mr-3" />
                  </div>

                  <div>
                    <div className="flex mb-2">
                      <div className="w-2 h-2 rounded-full bg-Success mt-2 mx-2"></div>
                      <p>Hulo Hulo</p>
                    </div>

                    <div className="flex">
                      <div className="flex">
                        <TbCurrencyDollar className="w-5 h-5 ml-0.5 mr-1.5 font-bold mt-[1px]" />
                        <p>3000</p>
                      </div>

                      <div className="flex ml-8">
                        <SlCalender className="w-5 h-5 ml-0.5 mr-1.5 font-bold" />
                        <p>11-08-2023</p>
                      </div>

                      <div className="flex ml-8">
                        <BiMessageRounded className="w-5 h-5 ml-0.5 mr-1.5 font-bold" />
                        <p>Main Paycheck</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-x-6">
                  <BsPencilFill className="w-6 h-6 my-4 justify-end" />
                  <BsFillTrashFill className="w-6 h-6 my-4 justify-end" />
                </div>
              </div>
            </div>
            <div className="w-full bg-[#222222] h-fit  rounded-lg p-3 mb-3">
              <div className="flex justify-between">
                <div className="flex">
                  <div>
                    <FaSackDollar className="w-10 h-10 mt-2 mr-3" />
                  </div>

                  <div>
                    <div className="flex mb-2">
                      <div className="w-2 h-2 rounded-full bg-Success mt-2 mx-2"></div>
                      <p>Hulo Hulo</p>
                    </div>

                    <div className="flex">
                      <div className="flex">
                        <TbCurrencyDollar className="w-5 h-5 ml-0.5 mr-1.5 font-bold mt-[1px]" />
                        <p>3000</p>
                      </div>

                      <div className="flex ml-8">
                        <SlCalender className="w-5 h-5 ml-0.5 mr-1.5 font-bold" />
                        <p>11-08-2023</p>
                      </div>

                      <div className="flex ml-8">
                        <BiMessageRounded className="w-5 h-5 ml-0.5 mr-1.5 font-bold" />
                        <p>Main Paycheck</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-x-6">
                  <BsPencilFill className="w-6 h-6 my-4 justify-end" />
                  <BsFillTrashFill className="w-6 h-6 my-4 justify-end" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
