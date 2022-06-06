import { useCoin } from "@utils/context/CoinContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import ReactHtmlParser from "react-html-parser";
interface ICoinInfoProps {
  image: string;
  name: string;
  description: { en: string };
  rank: number;
  price: number;
  marketCap: number;
}
const CoinInfo = ({
  image,
  name,
  description,
  rank,
  price,
  marketCap,
}: ICoinInfoProps) => {
  const { watchList, setWatchList } = useCoin();
  const [selectedCoin, setSelectedCoin] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      setSelectedCoin(
        Object.getOwnPropertyNames(watchList)?.length
          ? watchList?.find((item: string) => item === name)
          : []
      );
    }
  }, [watchList, router]);
  return (
    <div className="text-2xl text-white xl:w-[30%] w-full	ml-2 xl:border-r h-full flex flex-col justify-center items-center">
      <img
        src={image}
        alt={name}
        height={200}
        width={200}
        style={{ marginBottom: 20 }}
      />
      <h1 className="text-5xl font-semibold mb-5">{name}</h1>
      <p className="text-base px-6 pb-4 tracking-wide	font-light">
        {/* {description?.en} */}
        {/* {ReactHtmlParser(description?.en?.split(". ")[0])} */}
        {ReactHtmlParser(description?.en)}
      </p>
      <div className="px-5 pb-5 mt-3 w-full text-2xl ">
        <div className="flex w-full mb-5">
          <h1 className="font-semibold">Sıralama:</h1>&nbsp;
          <span className="text-yellow-400 font-thin">{rank}</span>
        </div>
        <div className="flex w-full mb-5">
          <h1 className="font-semibold">Fiyat:</h1>&nbsp;
          <span className="text-yellow-400 font-thin">
            <CurrencyFormat
              value={price}
              thousandSeparator={true}
              prefix={"₺"}
              displayType={"text"}
            />
          </span>
        </div>
        <div className="flex w-full mb-5">
          <h1 className="font-semibold">Hacim:</h1>&nbsp;
          <span className="text-yellow-400 font-thin">
            <CurrencyFormat
              value={marketCap}
              thousandSeparator={true}
              prefix={"₺"}
              displayType={"text"}
            />
          </span>
        </div>
        <div className=" w-full h-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!selectedCoin?.length) {
                setWatchList([...watchList, name]);
                localStorage.setItem(
                  "coins",
                  JSON.stringify([...watchList, name])
                );
              } else {
                const pullCoin = watchList?.filter(
                  (item: string) => item !== name
                );
                setWatchList(pullCoin);
                localStorage.setItem("coins", JSON.stringify(pullCoin));
              }
            }}
            type="submit"
            className={`${
              selectedCoin?.length
                ? "bg-red-500 border-red-500"
                : "bg-yellow-400 border-yellow-400"
            } border py-1.5 px-4 text-sm w-full rounded  h-full text-white font-semibold`}
          >
            {selectedCoin?.length
              ? "İzleme Listesinden Kaldır"
              : "İzleme listesine ekle"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CoinInfo);
