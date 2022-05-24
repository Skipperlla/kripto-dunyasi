import React, { memo, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import moment from "moment";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};
interface IFilterProps {
  name: string;
  value: string;
}
interface IChartProps {
  data: any;
  setDay: React.Dispatch<React.SetStateAction<number>>;
  day: string | number;
}
const Chart = ({ data, setDay, day }: IChartProps) => {
  const filter: IFilterProps[] = [
    { name: "24 Saat", value: "1" },
    { name: "30 Gün", value: "30" },
    { name: "3 Ay", value: "90" },
    { name: "1 Yıl", value: "365" },
  ];

  const [currentDay, setCurrentDay] = useState<string | undefined>("");
  useEffect(() => {
    if (day) {
      setCurrentDay(
        filter?.find((item) => {
          return item.value === day.toString();
        })?.value
      );
    } else {
      setCurrentDay("1");
    }
  }, [day]);

  return (
    <div className="xl:p-10 xl:mt-6 h-full px-5 pb-5 mt-3">
      <Line
        className="w-full h-full"
        data={{
          labels: data?.map((coin: number[]) => {
            return moment(coin[0]).locale("tr").format("LT");
          }),

          datasets: [
            {
              data: data?.map((coin: number[]) => coin[1]),
              label: `Fiyat ( Geçmiş ${currentDay} Gün ) için TRY`,
              borderColor: "#EEBC1D",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
      <div className="flex items-center justify-between xl:flex-row flex-col">
        {filter.map((item, index) => {
          return (
            <button
              key={index}
              className={`hover:bg-yellow-400 hover:text-black ${
                String(day ? day : 1) === item.value &&
                "bg-yellow-400 text-black"
              } transition-all border border-yellow-400  w-full text-white p-2 m-2 rounded`}
              onClick={() => {
                setDay(Number(item.value));
              }}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Chart);
