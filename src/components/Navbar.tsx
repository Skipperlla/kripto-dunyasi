// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();

  return (
    <header
      className="w-full h-16"
      style={{
        boxShadow:
          "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
      }}
    >
      <div className="xl:w-10/12 mx-auto px-6 h-full flex items-center justify-between">
        <div
          onClick={() => {
            if (router.pathname !== "/") router.push("/");
          }}
          className="cursor-pointer"
        >
          <h5 className="text-2xl text-yellow-400 font-semibold">
            Kripto Dünyası
          </h5>
        </div>
        <div className="flex items-center flex-1 justify-end">
          <div
            onClick={() => {
              if (router.pathname !== "/watchlist") router.push("/watchlist");
            }}
            className="transition-all border border-yellow-400 text-white py-2 px-5 h-10  rounded hover:bg-yellow-400 hover:text-black cursor-pointer text-center"
          >
            <FontAwesomeIcon icon="star" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
