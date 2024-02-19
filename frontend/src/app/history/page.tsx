"use client";

import React, { useState, useEffect } from "react";
import { useExpiredToken, useUserId } from "@/hooks/useToken";
import dynamic from "next/dynamic";
import axios from "axios";

import { HistoryResponse } from "@/interfaces/Latest";
import { formatCurrency } from "@/hooks/useCurrency";

const MyModal = dynamic(() => import("@/components/Modal"));

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
        `${process.env.NEXT_PUBLIC_API}/latestTransaction?userId=${userId}&page=1&limit=7`
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
    console.log("i fire once");
    getTransaction();
  }, [isExpired, userId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  };
  return (
    <>
      <MyModal myModal={myModal} setMyModal={setMyModal} />
      <div className="text-white h-[calc(100vh-30px)] w-full lg:bg-Highlight rounded-[30px] px-10 py-3 lg:ml-5 overflow-y-hidden">
        <h1 className="text-2xl mb-5 mt-3.5">Transaction History</h1>

        <div className="overflow-y-scroll shadow-md bg-transparent sm:rounded-lg h-[70vh] scrollbar-thin scrollbar-thumb-white">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#222222] dark:text-gray-400 sticky top-0 z-20">
              <tr>
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
              {transactionData?.map((data: any) => {
                return (
                  <tr
                    key={data._id}
                    className="bg-white dark:bg-[#383838] dark:border-gray-700 hover:bg-[#1b1b1b] dark:hover:bg-[#1b1b1b] overflow-y-hidden rounded-xl"
                  >
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
    </>
  );
};

export default Page;
