"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { useExpiredToken, useUserId } from "@/hooks/useToken";
import { NumericFormat } from "react-number-format";
import dynamic from "next/dynamic";
import axios from "axios";

import { incomeAmount, totalIncome } from "@/hooks/useMoney";
import { formatDate, converMongoDbDate } from "@/hooks/useDate";
import { IncomeCard } from "@/interfaces/Income";
import { formatCurrency } from "@/hooks/useCurrency";

import Layout from "@/components/Layout";
import Spinner from "../components/Spinner";

const HistoryCard = dynamic(() => import("@/components/HistoryCard"));
const MyModal = dynamic(() => import("@/components/Modal"));

const Page = () => {
  const [incomeData, setIncomeData] = useState<IncomeCard[]>();
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createIncome, setCreateIncome] = useState({
    userId: "",
    type: "",
    incomeName: "",
    incomeDescription: "",
    incomeDate: "",
    incomeAmount: "",
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
  const income: any = incomeAmount(incomeData);
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
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/income/${userId}`
      );
      setIncomeData(res.data.data);
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
      await axios.post(`${process.env.NEXT_PUBLIC_API}/income`, {
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
      setIsLoadingCreate(false);
    } catch (error) {
      setIsLoadingCreate(false);
      console.log(error);
    }
  };
  const handleDelete = async (transactionId: any) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/income`, {
        data: {
          ids: transactionId,
        },
      });
      getIncome();
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
    getIncome();
  }, [isExpired, userId]);
  return (
    <>
      <MyModal myModal={myModal} setMyModal={setMyModal} />
      <div className="text-white h-[calc(100vh-30px)] w-full overflow-y-auto lg:bg-Highlight rounded-[30px] px-10 py-7 lg:ml-5">
        <h1 className="text-2xl mb-5 font-semibold">Incomes</h1>
        <div className="w-full bg-[#222222] mb-5 rounded-lg py-3">
          <p className="text-center text-lg">
            Total Incomes: +{formatCurrency(totalIncome(income))}
          </p>
        </div>
        <div className="w-full bg-[#222222] "></div>
        <div className="flex">
          <div className="w-[100%] lg:w-[30%]">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  id="incomeName"
                  value={createIncome.incomeName}
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
                  value={createIncome.incomeAmount}
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
                  value={createIncome.incomeDate}
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
                  value={createIncome.incomeDescription}
                  onChange={handleTextAreaChange}
                  className="shadow-sm border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter The Income Description"
                  required
                ></textarea>
              </div>

              <div className="w-full lg:w-fit mx-auto lg:mx-0">
                <button
                  type="submit"
                  className="flex text-white bg-primary active:bg-primary-click hover:bg-primary-hover focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
                >
                  <p>Add Income</p>
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
                  handleDelete(incomeData?.map((data) => data._id))
                }
                className="bg-red-700 hover:bg-red-800 text-white px-2 py-4 rounded-xl mb-10 text-center"
              >
                Delete All Income
              </button>
            </div>

            {!isLoading && incomeData ? (
              incomeData?.map((data) => (
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
              ))
            ) : (
              <Spinner className="mx-auto flex w-24 h-24" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
