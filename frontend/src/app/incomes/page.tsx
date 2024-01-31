"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { useExpiredToken, useUserId } from "@/hooks/useToken";
import { NumericFormat } from "react-number-format";
import { useRouter } from "next/navigation";
import axios from "axios";

import { incomeAmount, totalIncome } from "@/utils/totalingMoney";
import { formatDate, converMongoDbDate } from "@/utils/formatDate";
import { IncomeCard } from "@/interfaces/Income";
import formatCurrency from "@/utils/formatCurrency";

import Layout from "@/app/components/layout";
import HistoryCard from "@/app/components/historyCard";

const page = () => {
  const [incomeData, setIncomeData] = useState<IncomeCard[]>();
  const [createIncome, setCreateIncome] = useState({
    userId: "",
    type: "",
    incomeName: "",
    incomeDescription: "",
    incomeDate: "",
    incomeAmount: "",
  });

  const userId = useUserId();
  const income: any = incomeAmount(incomeData);
  const navigate = useRouter();
  const isExpired = useExpiredToken();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCreateIncome((createIncome) => ({ ...createIncome, [name]: value }));
  };
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCreateIncome((createIncome) => ({ ...createIncome, [name]: value }));
  };

  const getIncome = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/income/${userId}`);
      setIncomeData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/income`, {
        userId: userId,
        type: "Income",
        incomeName: createIncome.incomeName,
        incomeDescription: createIncome.incomeDescription,
        incomeDate: converMongoDbDate(createIncome.incomeDate),
        incomeAmount: Number(createIncome.incomeAmount.replace(/,/g, "")),
      });
      getIncome();
      setCreateIncome({
        userId: "",
        type: "",
        incomeName: "",
        incomeDescription: "",
        incomeDate: "",
        incomeAmount: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (transactionId: any) => {
    try {
      await axios.delete(
        `http://localhost:5000/delete/transaction/Income/${transactionId}`
      );
      getIncome();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isExpired) {
      navigate.push("/login");
      localStorage.clear();
    }
  });

  useEffect(() => {
    getIncome();
  }, []);
  return (
    <Layout>
      <div className="text-white h-[calc(100vh-30px)] w-full overflow-y-auto bg-Highlight rounded-[30px] px-10 py-7 lg:ml-5">
        <h1 className="text-2xl mb-5 font-semibold">Incomes</h1>
        <div className="w-full bg-[#222222] mb-5 rounded-lg py-3">
          <p className="text-center text-lg">
            Total Incomes: +{formatCurrency(totalIncome(income))}
          </p>
        </div>
        <div className="w-full bg-[#222222] "></div>
        <div className="flex">
          <div className="w-[30%]">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  id="incomeName"
                  name="incomeName"
                  onChange={handleChange}
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Income Source"
                  required
                />
              </div>
              <div className="mb-6">
                <NumericFormat
                  name="incomeAmount"
                  onChange={handleChange}
                  placeholder="Enter The Income Amount"
                  allowLeadingZeros
                  thousandSeparator=","
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div className="mb-6">
                <input
                  type="date"
                  id="incomeDate"
                  name="incomeDate"
                  onChange={handleChange}
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Income Date"
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  id="incomeDescription"
                  name="incomeDescription"
                  onChange={handleTextAreaChange}
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Income Description"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="text-white bg-primary active:bg-primary-click hover:bg-primary-hover focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Add Income
              </button>
            </form>
          </div>

          <div className="w-[70%] h-[65vh] overflow-y-scroll overflow-x-hidden ml-5 scrollbar-thin scrollbar-thumb-primary-400">
            {incomeData?.map((data) => (
              <HistoryCard
                key={data._id}
                incomeId={data._id}
                name={data.incomeName}
                type={data.type}
                amount={formatCurrency(data.incomeAmount)}
                date={formatDate(data.incomeDate)}
                description={data.incomeDescription}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
