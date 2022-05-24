import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  SetStateAction,
} from "react";
import api from "@utils/lib/api";
export interface ICoins {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}
interface ICoin {
  image: { large: string };
  name: string;
  description: { en: string };
  market_cap_rank: number;
  market_data: {
    current_price: {
      try: number;
    };
    market_cap: {
      try: number;
    };
  };
}

interface ICoinContextProps {
  coins: ICoins[];
  coin: ICoin;
  isLoading: boolean;
  singleCoin: (coinId: string | string[] | undefined) => void;
  isChartLoading: boolean;
  chart: number[];
  coinChart: (coinId: string | string[] | undefined, day: number) => void;
  watchList: string[];
  setWatchList: React.Dispatch<SetStateAction<string[]>>;
  Coins: () => void;
  carousel: ICoins[];
  isCarouselLoading: boolean;
  topTen: () => void;
}

const CoinContext = createContext({} as ICoinContextProps);

export function CoinProvider({ children }: { children: React.ReactNode }) {
  // * Hooks
  const [coins, setCoins] = useState<ICoins[]>([]);
  const [coin, setCoin] = useState<ICoin>({
    image: { large: "" },
    name: "",
    description: { en: "" },
    market_cap_rank: 0,
    market_data: {
      current_price: { try: 0 },
      market_cap: { try: 0 },
    },
  });
  const [carousel, setCarousel] = useState<ICoins[]>([]);
  const [watchList, setWatchList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCarouselLoading, setIsCarouselLoading] = useState<boolean>(true);
  const [isChartLoading, setIsChartLoading] = useState<boolean>(true);
  const [chart, setChart] = useState<number[]>([]);
  useEffect(() => {
    if (localStorage.getItem("coins") === null) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      setWatchList(JSON.parse(localStorage.getItem("coins") || ""));
    }
  }, []);
  // * Functions
  const Coins = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(
        `markets?vs_currency=TRY&order=market_cap_desc&per_page=1250&sparkline=false`
      );

      setCoins(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  const singleCoin = async (coinId: string | string[] | undefined) => {
    setIsLoading(true);
    try {
      const { data, status } = await api.get(`/${coinId}`);
      setCoin(data);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const coinChart = async (
    coinId: string | string[] | undefined,
    day: number
  ) => {
    setIsChartLoading(true);
    try {
      const { data } = await api.get(
        `/${coinId}/market_chart?vs_currency=TRY&days=${day ? day : 1}`
      );
      setChart(data.prices);
      setIsChartLoading(false);
    } catch (err) {
      setIsChartLoading(false);
    }
  };
  const topTen = async () => {
    setIsCarouselLoading(true);
    try {
      const { data } = await api.get(
        `/markets?vs_currency=TRY&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      );
      setCarousel(data);
      setIsCarouselLoading(false);
    } catch (err) {
      setIsCarouselLoading(false);
    }
  };
  const MemoizedValue = useMemo(
    () => ({
      coins,
      Coins,
      isLoading,
      singleCoin,
      coin,
      coinChart,
      chart,
      isChartLoading,
      watchList,
      setWatchList,
      topTen,
      carousel,
      isCarouselLoading,
    }),
    [
      coins,
      coin,
      coinChart,
      chart,
      isLoading,
      isChartLoading,
      watchList,
      isCarouselLoading,
    ]
  );

  return (
    <CoinContext.Provider value={MemoizedValue}>
      {children}
    </CoinContext.Provider>
  );
}
export function useCoin() {
  return useContext(CoinContext);
}
