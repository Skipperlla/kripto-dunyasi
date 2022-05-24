import { useRouter } from "next/router";
import React from "react";
interface ICarouselCardProps {
  name: string;
  price: number;
  image: string;
  percentage: number | string;
  id: string;
}
const CarouselCard = ({
  name,
  price,
  image,
  percentage,
  id,
}: ICarouselCardProps) => {
  const router = useRouter();
  return (
    <div
      className="flex items-center justify-center flex-col cursor-pointer"
      onClick={() => {
        router.push(`/coin/${id}`);
      }}
    >
      <div className="w-24 h-24 mb-[10px]">
        <img src={image} className="w-full h-full object-cover" />
      </div>
      <div className="flex items-center justify-center">
        <h1>{name.toUpperCase()}</h1>
        <span
          className={`${percentage > 0 ? "text-green-500" : "text-red-500"}`}
        >
          &nbsp;{percentage}&
        </span>
      </div>
      <h1 className="text-2xl mt-2">₺&nbsp;{price}</h1>
    </div>
  );
};

export default CarouselCard;
