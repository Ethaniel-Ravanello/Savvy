import React from "react";
import { formatCurrency } from "../hooks/useCurrency";

import { FaMountainSun } from "react-icons/fa6";

import {
  Traveling,
  Gasoline,
  Education,
  Fixes,
  FoodAndDrink,
  Freelancing,
  Gift,
  Hangout,
  Hobbies,
  Home,
  Insurance,
  Investment,
  Loan,
  Movies,
  Other,
  Paycheck,
  Rent,
  Savings,
  Shopping,
  Subscription,
  Transportation,
  Utilities,
  Vehicle,
} from "./Icon";

const Card = ({ data }: any) => {
  function getIconCategory(category: string) {
    switch (category) {
      case "Traveling":
        return <Traveling />;
      case "Gasoline":
        return <Gasoline />;
      case "Education":
        return <Education />;
      case "Fixes":
        return <Fixes />;
      case "Food And Drink":
        return <FoodAndDrink />;
      case "Freelancing":
        return <Freelancing />;
      case "Gift":
        return <Gift />;
      case "Hangout":
        return <Hangout />;
      case "Hobbies":
        return <Hobbies />;
      case "Home":
        return <Home />;
      case "Insurance":
        return <Insurance />;
      case "Investments":
        return <Investment />;
      case "Loan":
        return <Loan />;
      case "Movies":
        return <Movies />;
      case "Other":
        return <Other />;
      case "Paycheck":
        return <Paycheck />;
      case "Rent":
        return <Rent />;
      case "Savings":
        return <Savings />;
      case "Shopping":
        return <Shopping />;
      case "Subscription":
        return <Subscription />;
      case "Transportation":
        return <Transportation />;
      case "Utilites":
        return <Utilities />;
      case "Verhicle":
        return <Vehicle />;
    }
  }

  return (
    <div className="w-full h-fit px-5 py-3 bg-primary-800  rounded-xl flex justify-between my-3">
      <div className="flex w-[80%]">
        {getIconCategory(data?.transactionCategory)}

        <div className="my-auto ml-7">
          <h1 className="text-white font-bold text-2xl mb-3">
            {data?.transactionCategory}
          </h1>
          <p className="text-primary-300 font-semibold">
            {data?.transactionDescription}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center text-white font-semibold">
        {data?.transactionType === "Income" ? "+" : "-"}
        <p>{formatCurrency(data?.transactionAmount)}</p>
      </div>
    </div>
  );
};

export default Card;
