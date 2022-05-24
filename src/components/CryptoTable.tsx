import { ICoins, useCoin } from "@utils/context/CoinContext";
import { useRouter } from "next/router";
import React from "react";
import CurrencyFormat from "react-currency-format";
import { Paginate } from "./index";
interface ICryptoTableProps {
  data: ICoins[];
  page: number;
  count: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  tableRef: any;
}
const CryptoTable = ({
  data,
  page,
  count,
  setPage,
  tableRef,
}: ICryptoTableProps) => {
  const router = useRouter();
  const thead = ["Ad", "Fiyat", "24s %", "Hacim(24s)"];
  const theadMax = Math.max(thead?.length) - 1;
  return (
    <React.Fragment>
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {thead?.map((item, index) => {
                return (
                  <th
                    scope="col"
                    className={`p-4 bg-yellow-400 text-black font-semibold text-lg  ${
                      index === 0
                        ? "rounded-tl-xl"
                        : index === theadMax
                        ? "rounded-tr-xl"
                        : ""
                    } flex-1`}
                    align={index === 0 ? "left" : "right"}
                    key={index}
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data?.slice((page - 1) * 10, page * 10).map((item, index) => {
              return (
                <tr
                  key={index}
                  className="border-b h-24 text-sm w-full bg-[#16171a] hover:bg-[#131111] cursor-pointer"
                  onClick={() => {
                    router.push(`/coin/${item.id}`);
                  }}
                >
                  <td className="p-4">
                    <div className="flex items-center ">
                      <div className="w-[50px] h-[50px]">
                        <img src={item.image} className="object-cover" />
                      </div>
                      <div className="flex flex-col  justify-center ml-2 flex-1">
                        <span className="text-xl text-white">
                          {item.symbol.toUpperCase()}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white" align="right">
                    <CurrencyFormat
                      value={item.current_price}
                      thousandSeparator={true}
                      prefix={"₺"}
                      displayType={"text"}
                    />
                  </td>
                  <td
                    className={`${
                      item.price_change_percentage_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    } p-4`}
                    align="right"
                  >
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="p-4 text-white" align="right">
                    <CurrencyFormat
                      value={item.market_cap}
                      thousandSeparator={true}
                      prefix={"₺"}
                      displayType={"text"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="relative overflow-x-auto">
        <Paginate count={count} setPage={setPage} tableRef={tableRef} />
      </div>
    </React.Fragment>
  );
};

export default CryptoTable;
