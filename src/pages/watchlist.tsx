import { ICoins, useCoin } from "@utils/context/CoinContext";
import React, { useEffect, useRef, useState } from "react";
import { CryptoTable } from "@components/index";
import { useRouter } from "next/router";

const watchlist = () => {
  // * Context
  const { watchList, Coins, coins } = useCoin();
  // * Hooks
  const router = useRouter();
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const tableRef = useRef(null);
  const [WatchList, setWatchList] = useState<ICoins[]>([]);
  useEffect(() => {
    if (router.isReady) Coins();
  }, [router]);
  useEffect(() => {
    if (coins?.length) {
      setWatchList(coins.filter((coin) => watchList.includes(coin.name)));
    }
  }, [coins, watchList]);
  // * Functions
  const filteredWatchListData = WatchList?.filter(
    (coin) =>
      coin?.name?.toLowerCase().includes(text.toLowerCase()) ||
      coin?.id?.toLowerCase().includes(text.toLowerCase()) ||
      coin?.symbol?.toLowerCase().includes(text.toLowerCase())
  );
  return (
    <section
      ref={tableRef}
      className="flex text-white flex-col items-center w-full px-6 xl:px-0 transition-all"
    >
      <div className="xl:w-10/12 w-full mx-auto">
        <div className="w-full ">
          {WatchList?.length ? (
            <React.Fragment>
              <h2 className="text-4xl m-5 p-4 font-semibold text-center">
                Kripto Paralar
              </h2>
              <div className="mb-5">
                <input
                  type="text"
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  placeholder="Kripto Para Birimi Arayın.."
                  className="w-full border border-gray-400 rounded outline-none bg-transparent py-2 px-4 h-14"
                />
              </div>

              <CryptoTable
                data={filteredWatchListData}
                count={filteredWatchListData?.length}
                page={page}
                tableRef={tableRef}
                setPage={setPage}
              />
            </React.Fragment>
          ) : (
            <div className=" w-full flex items-center justify-center py-12 text-yellow-400 text-3xl">
              <h1>Henüz izleme listenize bir kripto para eklemediniz.</h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default watchlist;
