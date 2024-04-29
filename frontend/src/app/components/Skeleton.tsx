export default function Skeleton({ isLogo }: any) {
  return (
    <div className="w-full h-fit px-5 py-3 bg-primary-800  rounded-xl flex justify-between my-3 animate-pulse">
      <div className="flex w-[80%]">
        {isLogo ? (
          <div className="bg-gray-500 w-fit h-fit p-3 rounded-full mt-1">
            <div className="w-8 h-8" />
          </div>
        ) : null}

        <div className="my-auto ml-7 w-full">
          <div className="w-[40%] h-3 animate-pulse bg-gray-500 rounded-lg mb-5"></div>
          <div className="w-[60%] h-3 animate-pulse bg-gray-500 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
