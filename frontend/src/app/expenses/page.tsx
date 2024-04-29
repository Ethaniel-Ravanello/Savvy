import React, { Suspense } from "react";

import ExpensePage from "./ExpensePage";
import Spinner from "@/components/Spinner";

export default async function Page() {
  return (
    <>
      <Suspense
        fallback={
          <Spinner className="w-40 h-40 mx-auto my-auto flex justify-center text-white text-center" />
        }
      >
        <ExpensePage />
      </Suspense>
    </>
  );
}
