import { Chart, CoinInfo } from "@components/index";
import LoadingSpinner from "@components/LoadingSpinner";
import { useCoin } from "@utils/context/CoinContext";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

const SingleCoin = () => {
  // * Context
  const { singleCoin, coin, isLoading, coinChart, chart, isChartLoading } =
    useCoin();
  // * Hooks
  const router = useRouter();
  const { coinId } = router?.query;
  const [day, setDay] = useState(0);
  useEffect(() => {
    if (router.isReady) {
      singleCoin(coinId);
      coinChart(coinId, day);
    }
  }, [router]);
  useEffect(() => {
    if (day) coinChart(coinId, day);
  }, [day]);

  return (
    <div className="flex items-center justify-center mt-6 h-full xl:flex-row flex-col">
      {isLoading && isChartLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <CoinInfo
            image={coin?.image?.large}
            name={coin?.name}
            description={coin?.description}
            rank={coin?.market_cap_rank}
            price={Number(coin?.market_data?.current_price.try)}
            marketCap={coin?.market_data?.market_cap.try}
          />
          <div className="flex-1 w-full h-full">
            <Chart data={chart} setDay={setDay} day={day} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default SingleCoin;
