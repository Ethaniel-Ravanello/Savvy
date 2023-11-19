"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import Layout from "../Components/Layout";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

const page = () => {
  const [transactionData, setTransactionData] = useState();

  const userId = localStorage.getItem("Id");

  const getTransaction = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/latestTransaction/${userId}`
      );
      setTransactionData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  };
  return (
    <Layout>
      <div className="text-white h-[calc(100vh-30px)] w-full overflow-x-auto overflow-y-auto lg:bg-Highlight rounded-[30px] px-10 py-7 lg:ml-5">
        <h1 className="text-2xl mb-5 mt-5 lg:mt-0">Transaction History</h1>

        <div className="overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#222222] dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Transaction
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Created Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionData?.map((data: any) => {
                return (
                  <tr
                    key={data._id}
                    className="bg-white border-b dark:bg-[#383838] dark:border-gray-700 hover:bg-[#1b1b1b] dark:hover:bg-[#1b1b1b]"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data.type}
                    </th>
                    <td className="px-6 py-4">
                      {data.type === "Income"
                        ? data.income_name
                        : data.expenses_name}
                    </td>
                    <td className="px-6 py-4">
                      {data.type === "Income"
                        ? data.income_amount
                        : data.expenses_amount}
                    </td>
                    <td className="px-6 py-4">
                      {data.type === "Income"
                        ? data.income_description
                        : data.expenses_description}
                    </td>
                    <td className="px-6 py-4">
                      {data.type === "Income"
                        ? formatDate(data.income_date)
                        : formatDate(data.expense_date)}
                    </td>
                    <td className="flex items-center px-6 py-4 space-x-3">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <BsFillPencilFill />
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        <BsFillTrashFill />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default page;
