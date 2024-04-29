"use client";

import React from "react";
import { useExpiredToken, useUserId } from "./hooks/useToken";
import { useGetTransaction } from "./libs/api";
import { useRouter } from "next/navigation";

import { formatCurrency } from "@/hooks/useCurrency";
import { formatDate } from "./hooks/useDate";

import Dropdown from "./components/Dropdown";
import Skeleton from "./components/Skeleton";
import Card from "./components/Card";

import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Page = () => {
  const link = [
    { href: "/incomes", label: "Add New Income" },
    { href: "/expenses", label: "Add New Expenses" },
  ];

  const router = useRouter();
  const userId = useUserId();
  const isExpired = useExpiredToken();

  const todayDateStr = new Date().toISOString().split("T")[0];

  const { historyTransaction, isLoadingHistory, errorHistory } =
    useGetTransaction(userId, isExpired);

  if (isExpired) {
    router.push("/login");
    localStorage.clear();
  }
  return (
    <>
      <div className="w-full rounded-xl flex lg:ml-5">
        <div className="w-full xl:w-[70%] pl-4 pt-4 pr-4 lg:p-6">
          <h1 className="text-3xl font-bold text-white">Hello Ethaniel</h1>
          <h1 className="text-lg font-bold text-primary-500">Welcome Back</h1>

          <div className="mt-5 w-full xl:flex xl:justify-end">
            <div>
              <div className="xl:hidden">
                <p className="text-primary-400 font-bold lg:text-xl my-auto">
                  Balance
                </p>
                <p className="text-primary-50 text-3xl font-semibold">
                  Rp. 4.500.00
                </p>

                <div className="bg-primary-900 w-full rounded-lg flex p-2 mt-5">
                  <div className="my-auto align-middle">
                    <BsGraphUpArrow className="text-success-400 w-5 h-5 my-auto align-middle mr-5" />
                  </div>
                  <div>
                    <p className="text-xl text-primary-400 font-semibold">
                      Income
                    </p>
                    <p className="text-xl text-primary-200 font-semibold">
                      Rp. 500.000.000
                    </p>
                  </div>
                </div>

                <div className="bg-primary-900 w-full rounded-lg flex p-2 mt-5">
                  <div className="my-auto align-middle">
                    <BsGraphDownArrow className="text-danger-400 w-5 h-5 my-auto align-middle mr-5" />
                  </div>
                  <div>
                    <p className="text-xl text-primary-400 font-semibold">
                      Expense
                    </p>
                    <p className="text-xl text-primary-200 font-semibold">
                      Rp. 500.000.000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex lg:justify-end w-full mt-5 xl:mt-0">
            <Dropdown label={"Add Transactions"} link={link} />
          </div>

          <div className="w-full lg:w-full my-5">
            <HiMagnifyingGlass className="text-white font-bold  relative top-8 left-4" />
            <input
              type="text"
              className="bg-primary-900 text-white w-full rounded-xl py-2 md:py-3 font-semibold pl-10"
              placeholder="Search Any Transaction"
            />
          </div>

          <div className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-20rem)] overflow-y-scroll lg:pr-5 lg:scrollbar-thin lg:scrollbar-thumb-primary-400">
            {!isLoadingHistory && historyTransaction ? (
              Object.keys(historyTransaction.data || {}).map((date) => (
                <div key={date}>
                  <h2 className="text-xl font-bold mt-4 text-white">
                    {date === todayDateStr ? "Today" : formatDate(date)}
                  </h2>
                  {historyTransaction.data[date].map((item: any) => (
                    <Card key={item._id} data={item} />
                  ))}
                </div>
              ))
            ) : (
              <>
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
                <Skeleton isLogo={true} />
              </>
            )}
          </div>
        </div>

        <div className="w-[30%] p-6 hidden xl:block">
          <div className="flex flex-wrap gap-2 mt-[4.5rem]">
            {!isLoadingHistory && historyTransaction ? (
              <>
                <div className="bg-primary-900 p-3 2xl:p-5 rounded-lg w-full">
                  <p className="text-lg 2xl:text-xl text-primary-400 font-semibold">
                    Total Balance
                  </p>
                  <p className="text-xl 2xl:text-3xl text-primary-200 font-semibold">
                    {formatCurrency(
                      historyTransaction?.incomeAmount -
                        historyTransaction?.expenseAmount
                    )}
                  </p>
                </div>

                {/* <div className="bg-primary-900 p-3 2xl:p-5 rounded-lg w-full">
                  <p className="text-lg 2xl:text-xl text-primary-400 font-semibold">
                    Days Before Salary
                  </p>
                  <p className="text-xl 2xl:text-3xl text-primary-200 font-semibold">
                    13 Days
                  </p>
                </div> */}

                <div className="bg-primary-900 min-w-full rounded-lg mt-10 flex p-5">
                  <div className="my-auto align-middle">
                    <BsGraphUpArrow className="text-success-400 w-8 h-8 2xl:w-10 2xl:h-10 my-auto align-middle mr-5" />
                  </div>
                  <div>
                    <p className="text-lg 2xl:text-xl text-primary-400 font-semibold">
                      Total Income
                    </p>
                    <p className="text-xl 2xl:text-3xl text-primary-200 font-semibold">
                      {formatCurrency(historyTransaction?.incomeAmount)}
                    </p>
                  </div>
                </div>

                <div className="bg-primary-900 min-w-full rounded-lg mt-3 flex p-5">
                  <div className="my-auto align-middle">
                    <BsGraphDownArrow className="text-danger-400 w-8 h-8 2xl:w-10 2xl:h-10 my-auto align-middle mr-5" />
                  </div>
                  <div>
                    <p className="text-lg 2xl:text-xl text-primary-400 font-semibold">
                      Total Expense
                    </p>
                    <p className="text-xl 2xl:text-3xl text-primary-200 font-semibold">
                      {formatCurrency(historyTransaction?.expenseAmount)}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Skeleton isLogo={false} />
                <Skeleton isLogo={false} />
                <Skeleton isLogo={false} />
                <Skeleton isLogo={false} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
