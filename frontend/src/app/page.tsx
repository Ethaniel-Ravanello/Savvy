"use client";
import React, { useEffect, useState } from "react";
import { useExpiredToken, useUserId } from "./hooks/useToken";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import axios from "axios";

import { IncomeResponse, TotalIncomeResponse } from "@/interfaces/Income";
import { ExpenseResponse, TotalExpenseResponse } from "@/interfaces/Expense";
import { TransactionResponse } from "@/interfaces/Latest";
import TransactionCard from "@/components/TransactionCard";
import { formatCurrency } from "@/hooks/useCurrency";
import Layout from "@/components/Layout";
import Charts from "@/components/Chart";
import Spinner from "@/components/Spinner";

const MyModal = dynamic(() => import("@/components/Modal"));

import {
  IoMdArrowRoundDown,
  IoMdArrowRoundUp,
  IoMdArrowRoundForward,
} from "react-icons/io";
import { BiDollarCircle } from "react-icons/bi";

const Page = () => {
  const [latestTransaction, setLatestTransaction] =
    useState<TransactionResponse[]>();
  const [income, setIncome] = useState<IncomeResponse[]>();
  const [totalIncome, setTotalIncome] = useState<TotalIncomeResponse>();
  const [expense, setExpense] = useState<ExpenseResponse[]>();
  const [totalExpense, setTotalExpense] = useState<TotalExpenseResponse>();
  const [isLoading, setIsLoading] = useState(false);
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
  const navigate = useRouter();

  const getAllData = async () => {
    try {
      setIsLoading(true);
      const [latestTransaction, income, totalIncome, expense, totalExpense] =
        await axios.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_API}/latestTransaction/${userId}`
          ),
          axios.get(`${process.env.NEXT_PUBLIC_API}/income/${userId}`),
          axios.get(`${process.env.NEXT_PUBLIC_API}/total/income/${userId}`),
          axios.get(`${process.env.NEXT_PUBLIC_API}/expense/${userId}`),
          axios.get(`${process.env.NEXT_PUBLIC_API}/total/expense/${userId}`),
        ]);
      setLatestTransaction(latestTransaction.data.data);
      setIncome(income.data.data);
      setTotalIncome(totalIncome.data);
      setExpense(expense.data.data);
      setTotalExpense(totalExpense.data);
      setIsLoading(false);
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
  }, [isExpired]);

  useEffect(() => {
    getAllData();
  }, [userId]);

  return (
    <Layout>
      <MyModal myModal={myModal} setMyModal={setMyModal} />
      <div className="w-full">
        <div className="xl:ml-7 md:flex ">
          <div className="mx-auto align-middle mb-2 hidden xl:flex items-center lg:ml-7 mt-10">
            {!isLoading ? (
              <Charts
                income={totalIncome?.data ?? 0}
                expense={totalExpense?.data ?? 0}
                formatCurrency={formatCurrency}
              />
            ) : (
              <Spinner className="text-neutral-100 w-60 h-60" />
            )}
          </div>

          <div className="w-full px-3 xl:ml-8">
            <div className="w-fit  text-white mb-5 md:hidden md:mt-0 ml-3">
              <div className="pt-5">
                <p className="font-semibold text-2xl text-white">Hello Ethan</p>
                <p className="text-white/40">Welcome Back</p>
              </div>
              <p className="text-xl text-white/40 pt-5">Balance</p>
              <p className="text-3xl text-center">
                {formatCurrency(
                  (totalIncome?.data ?? 0) - (totalExpense?.data ?? 0)
                )}
              </p>
            </div>

            <div className=" text-white flex justify-between md:justify-normal md:flex-wrap p-2 rounded-[20px] w-full">
              <div className="p-3 md:p-5 w-fit flex bg-Highlight rounded-xl">
                <div className="bg-success-secondary rounded-full my-auto p-1 mr-2">
                  <IoMdArrowRoundUp className="my-auto w-6 h-6 md:w-8 md:h-8 text-success font-bold" />
                </div>
                <div>
                  <h2 className=" md:text-md mb-1">Total Income</h2>
                  {!isLoading ? (
                    <p className="md:text-2xl font-semibold">
                      {formatCurrency(totalIncome?.data)}
                    </p>
                  ) : (
                    <Spinner className="text-neutral-100 w-10 h-10 mx-auto flex" />
                  )}
                </div>
              </div>

              <div className="p-3 md:p-5 w-fit flex bg-Highlight md:ml-10 md:mt-0 rounded-xl">
                <div className="bg-red-700 rounded-full my-auto p-1 mr-2">
                  <IoMdArrowRoundDown className="my-auto w-6 h-6 md:w-8 text-red-900 md:h-8" />
                </div>
                <div>
                  <h2 className=" md:text-md mb-1">Total Expense</h2>
                  {!isLoading ? (
                    <p className="md:text-2xl font-semibold">
                      {formatCurrency(totalExpense?.data)}
                    </p>
                  ) : (
                    <Spinner className="text-neutral-100 w-10 h-10 mx-auto flex" />
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[20px] mt-3 lg:mt-0 px-3 w-full h-fit">
              <h2 className="text-white text-xl mb-5 md:mb-1 font-bold">
                Latest Transaction
              </h2>
              <div className="h-[40vh] md:h-[30vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-white">
                {!isLoading ? (
                  latestTransaction
                    ?.sort()
                    .map((data: TransactionResponse, idx) => (
                      <div key={idx} className="mb-3">
                        <TransactionCard
                          key={idx}
                          type={data.type}
                          amount={
                            data.type === "Income"
                              ? formatCurrency(data.incomeAmount)
                              : formatCurrency(data.expenseAmount)
                          }
                          name={
                            data.type === "Income"
                              ? data.incomeName
                              : data.expenseName
                          }
                          description={
                            data.type === "Income"
                              ? data.incomeDescription
                              : data.expenseDescription
                          }
                        />
                      </div>
                    ))
                ) : (
                  <Spinner className="text-neutral-100 w-32 h-32 mx-auto flex my-auto" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex md:justify-between text-white h-[36%] md:mt-5">
          <div className="hidden lg:block xl:ml-7 px-3 lg:px-0 lg:pl-3 md:w-[25%] mb-5 lg:mb-0">
            <Link href="/incomes">
              <div className="bg-Highlight p-5 rounded-[20px] text-white lg:mt-2 flex">
                <BiDollarCircle className="w-8 h-8 text-success-secondary mr-3" />
                <p className="pt-1 hover:underline">Add New Income</p>
              </div>
            </Link>

            <Link href="/expenses">
              <div className="bg-Highlight p-5 rounded-[20px] text-white mt-5 xl:mt-2 flex">
                <BiDollarCircle className="w-8 h-8 text-red-800  mr-3" />
                <p className="pt-1 hover:underline">Add New Expenses</p>
              </div>
            </Link>
          </div>

          <div className="hidden px-3 md:px-8 lg:pr-3 lg:px-0 pb-3 md:pb-0 md:flex md:justify-between md:w-[100%] lg:ml-3">
            <div className="rounded-[20px] mb-5 lg:mb-0 md:mb-0 md:w-full md:mr-4 lg:max-h-[200px]">
              <div className="flex w-full justify-between">
                <p className=" lg:text-xl font-semibold -mt-1.5 md:pt-1">
                  Latest Incomes
                </p>
                <div
                  onClick={() => navigate.push("/incomes")}
                  className="rounded-full bg-[#222222] text-end p-2 -mt-2 cursor-pointer"
                >
                  <IoMdArrowRoundForward className="w-5 h-5" />
                </div>
              </div>

              <div className="overflow-y-scroll h-[200px] lg:h-[180px] scrollbar-thin scrollbar-thumb-white">
                {!isLoading ? (
                  income?.map((data, idx) => (
                    <div key={idx} className="bg-Highlight rounded-lg mt-3">
                      <TransactionCard
                        amount={formatCurrency(data.incomeAmount)}
                        name={data.incomeName}
                        description={data.incomeDescription}
                        type={data.type}
                        key={idx}
                      />
                    </div>
                  ))
                ) : (
                  <Spinner className="text-neutral-100 w-24 h-24 mx-auto flex mt-10" />
                )}
              </div>
            </div>

            <div className="rounded-[20px] mb-5 lg:mb-0 md:mb-0 md:w-[90%] md:mr-4 lg:max-h-[200px]">
              <div className="flex w-full justify-between">
                <p className="lg:text-xl font-semibold -mt-1.5 md:pt-1">
                  Latest Expenses
                </p>
                <div
                  onClick={() => navigate.push("/expenses")}
                  className="rounded-full bg-[#222222] text-end p-2 -mt-2 cursor-pointer"
                >
                  <IoMdArrowRoundForward className="w-5 h-5" />
                </div>
              </div>

              <div className="overflow-y-scroll h-[200px] lg:h-[180px] scrollbar-thin scrollbar-thumb-white">
                {!isLoading ? (
                  expense?.map((data, idx) => (
                    <div key={idx} className="bg-Highlight rounded-lg mt-3">
                      <TransactionCard
                        amount={formatCurrency(data.expenseAmount)}
                        type={data.type}
                        key={idx}
                        name={data.expenseName}
                        description={data.expenseDescription}
                      />
                    </div>
                  ))
                ) : (
                  <Spinner className="text-neutral-100 w-24 h-24 mx-auto flex mt-10" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
