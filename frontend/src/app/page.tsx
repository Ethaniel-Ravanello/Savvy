"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { IncomeResponse, TotalIncomeResponse } from "./Interfaces/Income";
import { ExpenseResponse, TotalExpenseResponse } from "./Interfaces/Expense";
import { TransactionResponse } from "./Interfaces/Latest";
import formatCurrency from "./utils/FormatCurrency";

import Layout from "./Components/Layout";
import Charts from "./Components/Chart";
import TransactionCard from "./Components/TransactionCard";

import { BiDollarCircle } from "react-icons/bi";
import {
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";

const page = () => {
  const [latestTransaction, setLatestTransaction] =
    useState<TransactionResponse[]>();
  const [income, setIncome] = useState<IncomeResponse[]>();
  const [totalIncome, setTotalIncome] = useState<TotalIncomeResponse>();
  const [expense, setExpense] = useState<ExpenseResponse[]>();
  const [totalExpense, setTotalExpense] = useState<TotalExpenseResponse>();

  const userId = localStorage.getItem("Id");
  const navigate = useRouter();
  const getAllData = async () => {
    try {
      const [latestTransaction, income, totalIncome, expense, totalExpense] =
        await axios.all([
          axios.get(`http://localhost:5000/latestTransaction/${userId}`),
          axios.get(`http://localhost:5000/income/${userId}`),
          axios.get(`http://localhost:5000/total/income/${userId}`),
          axios.get(`http://localhost:5000/expense/${userId}`),
          axios.get(`http://localhost:5000/total/expense/${userId}`),
        ]);
      setLatestTransaction(latestTransaction.data.data);
      setIncome(income.data.data);
      setTotalIncome(totalIncome.data);
      setExpense(expense.data.data);
      setTotalExpense(totalExpense.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      navigate.push("/login");
    }
  });

  useEffect(() => {
    getAllData();
  }, []);

  console.log(userId);
  return (
    <Layout>
      <div className="w-full">
        <div className="xl:ml-7 mt-8 md:mt-0 md:flex ">
          <div className="mx-auto align-middle mb-2 hidden xl:flex items-center lg:ml-7 mt-10">
            <Charts
              income={totalIncome?.data ?? 0}
              expense={totalExpense?.data ?? 0}
              formatCurrency={formatCurrency}
            />
          </div>

          <div className="w-full px-3 xl:ml-8">
            <div className="w-fit mx-auto text-white mb-5 md:hidden">
              <p className="text-xl text-center text-white/40">Total Balance</p>
              <p className="text-3xl text-center">
                {formatCurrency(
                  totalIncome?.data ?? 0 - (totalExpense?.data ?? 0)
                )}
              </p>
            </div>
            <div className=" text-white flex flex-wrap justify-around bg-Highlight p-2 rounded-[20px] w-full">
              <div className="pt-2 w-fit flex">
                <div className="bg-[#222222] rounded-full my-auto p-1 mr-2">
                  <AiOutlineArrowUp className="my-auto w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                  <h2 className=" md:text-md mb-1">Total Income</h2>
                  <p className="md:text-2xl font-semibold">
                    {formatCurrency(totalIncome?.data)}
                  </p>
                </div>
              </div>

              <div className="pt-2 w-fit flex">
                <div className="bg-[#222222] rounded-full my-auto p-1 mr-2">
                  <AiOutlineArrowDown className="my-auto w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                  <h2 className=" md:text-md mb-1">Total Expense</h2>
                  <p className="md:text-2xl font-semibold">
                    {formatCurrency(totalExpense?.data)}
                  </p>
                </div>
              </div>
            </div>

            <div className=" bg-Highlight rounded-[20px] mt-3 px-3 pt-3 w-full h-fit">
              <h2 className="text-white text-xl mb-5 md:mb-1">
                Latest Transaction
              </h2>
              <div className="md:flex md:flex-wrap lg:max-h-[200px] overflow-y-scroll scrollbar-thin scrollbar-thumb-white">
                {latestTransaction?.map((data: TransactionResponse) => (
                  <div className="md:m-5">
                    <TransactionCard
                      key={data.id}
                      type={data.type}
                      amount={
                        data.type === "Income"
                          ? formatCurrency(data.incomeAmount)
                          : formatCurrency(data.expenseAmount)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex md:justify-between text-white h-[36%] md:mt-5">
          <div className="xl:ml-7 px-3 lg:px-0 lg:pl-3 md:w-[35%] mb-5">
            <Link href="/incomes">
              <div className="bg-Highlight p-5 rounded-[20px] text-white lg:mt-2 flex">
                <BiDollarCircle className="w-8 h-8 text-Success mr-3" />
                <p className="pt-1 hover:underline">Add New Income</p>
              </div>
            </Link>

            <Link href="/expenses">
              <div className="bg-Highlight p-5 rounded-[20px] text-white mt-5 xl:mt-10 flex">
                <BiDollarCircle className="w-8 h-8 text-red-800  mr-3" />
                <p className="pt-1 hover:underline">Add New Expenses</p>
              </div>
            </Link>
          </div>

          <div className="px-3 lg:pr-3 lg:px-0 pb-3 md:pb-0 md:flex md:justify-between md:w-[65%] md:ml-5">
            <div className="bg-Highlight rounded-[20px] p-4 mb-5 md:mb-0 md:w-full md:mr-4 lg:max-h-[200px]">
              <div className="flex w-full justify-between">
                <p className=" lg:text-xl font-semibold -mt-1.5 md:pt-1">
                  Latest Incomes
                </p>
                <div className="rounded-full bg-[#222222] text-end p-2 -mt-2 cursor-pointer">
                  <AiOutlineArrowRight className="w-5 h-5" />
                </div>
              </div>

              <div className="overflow-y-scroll h-[80%] scrollbar-thin scrollbar-thumb-white">
                {income?.map((data) => (
                  <div className="pt-2">
                    <TransactionCard
                      amount={formatCurrency(data.incomeAmount)}
                      type={data.type}
                      key={data.id}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-Highlight rounded-[20px] p-4 md:w-full md:ml-4 lg:max-h-[200px]">
              <div className="flex w-full justify-between">
                <p className="lg:text-xl font-semibold -mt-1.5 md:pt-1">
                  Latest Expenses
                </p>
                <div className="rounded-full bg-[#222222] text-end p-2 -mt-2 cursor-pointer">
                  <AiOutlineArrowRight className="w-5 h-5" />
                </div>
              </div>

              <div className="overflow-y-scroll h-[80%] scrollbar-thin scrollbar-thumb-white">
                {expense?.map((data) => (
                  <div className="pt-2">
                    <TransactionCard
                      amount={formatCurrency(data.expenseAmount)}
                      type={data.type}
                      key={data.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
