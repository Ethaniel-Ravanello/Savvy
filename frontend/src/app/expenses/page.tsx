"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { ExpenseCard } from "../Interfaces/Expense";

import { formatDate, converMongoDbDate } from "../utils/FormatDate";
import formatCurrency from "../utils/FormatCurrency";
import { totalIncome, incomeAmount } from "../utils/TotalingMoney";

import Layout from "../Components/Layout";
import HistoryCard from "../Components/HistoryCard";

const page = () => {
  const [expenseData, setExpenseData] = useState<ExpenseCard[]>();
  const [createExpense, setCreateExpense] = useState({
    userId: "",
    type: "",
    expenseName: "",
    expenseDescription: "",
    expenseDate: "",
    expenseAmount: 0,
  });

  const userId = localStorage.getItem("Id");
  const expense = incomeAmount(expenseData);

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
    try {
      const res = await axios.get(`http://localhost:5000/expense/${userId}`);
      setExpenseData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/expense`, {
        userId: userId,
        type: "Expense",
        expenseName: createExpense.expenseName,
        expenseDescription: createExpense.expenseDescription,
        expenseDate: converMongoDbDate(createExpense.expenseDate),
        expenseAmount: createExpense.expenseAmount,
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    userId;
  }, []);
  console.log(createExpense);
  return (
    <Layout>
      <div className="text-white h-[calc(100vh-30px)] w-full overflow-y-auto bg-Highlight rounded-[30px] px-10 py-7 ml-5">
        <h1 className="text-2xl mb-5 font-semibold">Expenses</h1>
        <div className="w-full bg-[#222222] mb-5 rounded-lg py-3">
          <p className="text-center text-lg">
            Total Expenses: -{formatCurrency(totalIncome(expense))}
          </p>
        </div>
        <div className="w-full bg-[#222222] "></div>
        <div className="flex">
          <div className="w-[30%]">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  name="expenseName"
                  onChange={handleChange}
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Income Source"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="number"
                  name="expenseAmount"
                  onChange={handleChange}
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Income Amount"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="date"
                  name="expenseDate"
                  onChange={handleChange}
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Income Date"
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  id="Description"
                  name="expenseDescription"
                  onChange={handleTextAreaChange}
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
            {expenseData?.map((data) => (
              <HistoryCard
                key={data._id}
                incomeId={data._id}
                name={data.expenseName}
                type={data.type}
                amount={formatCurrency(data.expenseAmount)}
                date={formatDate(data.expenseDate)}
                description={data.expenseDescription}
                // handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
