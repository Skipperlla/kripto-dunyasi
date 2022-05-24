import { useRouter } from "next/router";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="px-40 py-20  rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-yellow-400 text-9xl">404</h1>
          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span>{" "}
            <span className="text-yellow-400">Sayfa Bulunamadı</span>
          </h6>
          <p className="mb-8 text-center text-gray-500 md:text-lg">
            Aradığınız sayfa mevcut değil.
          </p>
          <div
            onClick={() => {
              router.push("/");
            }}
            className="transition-all border border-yellow-400 text-white py-2 px-5 h-10  rounded hover:bg-yellow-400 hover:text-black cursor-pointer text-center"
          >
            Ana Sayfa
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
