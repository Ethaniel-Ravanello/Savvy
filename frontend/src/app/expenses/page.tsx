"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { useExpiredToken, useUserId } from "@/hooks/useToken";
import { ExpenseCard } from "@/interfaces/Expense";
import dynamic from "next/dynamic";
import axios from "axios";

import { formatDate, converMongoDbDate } from "@/hooks/useDate";
import { totalIncome, incomeAmount } from "@/hooks/useMoney";
import { NumericFormat } from "react-number-format";
import { formatCurrency } from "@/hooks/useCurrency";

import HistoryCard from "@/components/HistoryCard";
import Layout from "@/components/Layout";
import Spinner from "../components/Spinner";

const MyModal = dynamic(() => import("@/components/Modal"));

const Page = () => {
  const [expenseData, setExpenseData] = useState<ExpenseCard[]>();
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createExpense, setCreateExpense] = useState({
    userId: "",
    type: "",
    expenseName: "",
    expenseDescription: "",
    expenseDate: "",
    expenseAmount: "",
  });
  const [myModal, setMyModal] = useState({
    isOpen: false,
    header: "",
    body: "",
    button: "",
    isRedirect: false,
    href: "",
  });

  const userId = useUserId();
  const expense = incomeAmount(expenseData);
  const isExpired = useExpiredToken();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCreateExpense((createExpense) => ({ ...createExpense, [name]: value }));
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCreateExpense((createExpense) => ({ ...createExpense, [name]: value }));
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/expense/${userId}`
      );
      setExpenseData(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    setIsLoadingCreate(true);
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/expense`, {
        userId: userId,
        type: "Expense",
        expenseName: createExpense.expenseName,
        expenseDescription: createExpense.expenseDescription,
        expenseDate: converMongoDbDate(createExpense.expenseDate),
        expenseAmount: Number(createExpense.expenseAmount.replace(/,/g, "")),
      });
      getData();
      setCreateExpense({
        userId: "",
        type: "",
        expenseName: "",
        expenseDescription: "",
        expenseDate: "",
        expenseAmount: "",
      });
      setIsLoadingCreate(false);
    } catch (error) {
      setIsLoadingCreate(false);
      console.log(error);
    }
  };
  const handleDelete = async (transactionId: any) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/expense`, {
        data: {
          ids: transactionId,
        },
      });
      getData();
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
    getData();
  }, [isExpired, userId]);

  return (
    <Layout>
      <MyModal myModal={myModal} setMyModal={setMyModal} />
      <div className="text-white h-[calc(100vh-30px)] w-full overflow-y-auto lg:bg-Highlight rounded-[30px] px-10 py-7 lg:ml-5">
        <h1 className="text-2xl mb-5 font-semibold">Expenses</h1>
        <div className="w-full bg-[#222222] mb-5 rounded-lg py-3">
          <p className="text-center text-lg">
            Total Expenses: -{formatCurrency(totalIncome(expense))}
          </p>
        </div>
        <div className="w-full bg-[#222222]"></div>
        <div className="flex">
          <div className="w-[100%] lg:w-[30%]">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  value={createExpense.expenseName}
                  name="expenseName"
                  onChange={handleChange}
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Expense Name"
                  required
                />
              </div>
              <div className="mb-6">
                <NumericFormat
                  name="expenseAmount"
                  value={createExpense.expenseAmount}
                  onChange={handleChange}
                  placeholder="Enter The Expense Amount"
                  // prefix="IDR"
                  allowLeadingZeros
                  thousandSeparator=","
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div className="mb-6">
                <input
                  type="date"
                  name="expenseDate"
                  value={createExpense.expenseDate}
                  onChange={handleChange}
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Expense Date"
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  id="Description"
                  value={createExpense.expenseDescription}
                  name="expenseDescription"
                  onChange={handleTextAreaChange}
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Expense Description"
                  required
                ></textarea>
              </div>

              <div className="w-full lg:w-fit">
                <button
                  type="submit"
                  className="flex text-white bg-primary active:bg-primary-click hover:bg-primary-hover focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
                >
                  <p>Add Expense</p>
                  {isLoadingCreate ? (
                    <Spinner className="text-neutral-100 w-5 h-5 ml-5" />
                  ) : null}
                </button>
              </div>
            </form>
          </div>

          <div className="w-[70%] h-[65vh] overflow-y-scroll overflow-x-hidden ml-5 scrollbar-thin scrollbar-thumb-primary-400 hidden lg:block">
            <div className=" justify-end flex w-full">
              <button
                onClick={() =>
                  handleDelete(expenseData?.map((data) => data._id))
                }
                className="bg-red-700 hover:bg-red-800 text-white px-2 py-4 rounded-xl mb-10 text-center"
              >
                Delete All Income
              </button>
            </div>

            {!isLoading && expenseData ? (
              expenseData?.map((data) => (
                <HistoryCard
                  key={data._id}
                  incomeId={data._id}
                  name={data.expenseName}
                  type={data.type}
                  amount={formatCurrency(data.expenseAmount)}
                  date={formatDate(data.expenseDate)}
                  description={data.expenseDescription}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <Spinner className="mx-auto flex w-24 h-24" />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
