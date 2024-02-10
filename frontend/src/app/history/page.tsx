"use client";

import React, { useState, useEffect } from "react";
import { useExpiredToken, useUserId } from "@/hooks/useToken";
import axios from "axios";

import { HistoryResponse } from "@/interfaces/Latest";
import { formatCurrency } from "@/hooks/useCurrency";
import Layout from "@/components/Layout";
import MyModal from "@/components/Modal";

import { BsFillTrashFill } from "react-icons/bs";

const Page = () => {
  const [transactionData, setTransactionData] = useState<HistoryResponse[]>();
  const [myModal, setMyModal] = useState({
    isOpen: false,
    header: "",
    body: "",
    button: "",
    isRedirect: false,
    href: "",
  });

  const userId = useUserId();
  const isExpired = useExpiredToken();

  const getTransaction = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/latestTransaction/${userId}`
      );
      setTransactionData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isExpired) {
      setMyModal({
        isOpen: true,
        header: "Session Expired",
        body: "Your Session Has Expired Please Login Again.",
        button: "Close",
        isRedirect: true,
        href: "/login",
      });
      localStorage.clear();
    }
  });

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
      <MyModal myModal={myModal} setMyModal={setMyModal} />
      <div className="text-white h-[calc(100vh-30px)] w-full lg:bg-Highlight rounded-[30px] px-10 py-3 lg:ml-5 overflow-y-hidden">
        <h1 className="text-2xl mb-5 mt-3.5">Transaction History</h1>

        <div className="overflow-y-scroll shadow-md sm:rounded-lg h-[85vh] scrollbar-thin scrollbar-thumb-white">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#222222] dark:text-gray-400 sticky top-0 z-20">
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
            <tbody className="rounded-xl">
              {transactionData?.slice(0, 8).map((data: any) => {
                return (
                  <tr
                    key={data._id}
                    className="bg-white border-b dark:bg-[#383838] dark:border-gray-700 hover:bg-[#1b1b1b] dark:hover:bg-[#1b1b1b] overflow-y-hidden rounded-xl"
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
                        ? data.incomeName
                        : data.expenseName}
                    </td>
                    <td className="px-6 py-4">
                      {data.type === "Income"
                        ? formatCurrency(data.incomeAmount)
                        : formatCurrency(data.expenseAmount)}
                    </td>
                    <td className="px-6 py-4">
                      {data.type === "Income"
                        ? data.incomeDescription
                        : data.expenseDescription}
                    </td>
                    <td className="px-6 py-4">
                      {data.type === "Income"
                        ? formatDate(data.incomeDate)
                        : formatDate(data.expenseDate)}
                    </td>
                    <td className="items-center flex justify-center pt-7">
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline items-center"
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

export default Page;
