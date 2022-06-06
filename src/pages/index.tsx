import React, { useEffect, useRef, useState } from "react";

import { CryptoTable, LoadingSpinner, CarouselCard } from "@components/index";
import { useCoin } from "@utils/context/CoinContext";
import { useRouter } from "next/router";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";
const index = () => {
  const uploadPhoto = async () => {
    await axios
      .post(
        "https://creator.zoho.com/api/v2/cosmedica/crm/form/Leads",
        {
          headers: {
            Authorization: `Bearer ${"1000.f5eca7c441c9994793890c7edc3616f5.b1b307c1f500cf0378df891c32aad628"}`,
          },
        },
        {
          data: {
            Email: "gokhantesttest@gmail.com",
            Converted: "No",
            Country: "Turkey",
            Name: {
              first_name: "Gökhan",
              last_name: "Bayraktar",
            },
          },
        }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    uploadPhoto();
  }, []);

  // * Context
  const { Coins, coins, isLoading, topTen, carousel, isCarouselLoading } =
    useCoin();
  // * Hooks
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const tableRef = useRef<null>(null);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      Coins();
      topTen();
    }
  }, [router]);
  // * Functions
  const filteredData = coins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(text.toLowerCase()) ||
      coin.id.toLowerCase().includes(text.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(text.toLowerCase())
  );
  const items = carousel?.map((item, index) => {
    return (
      <CarouselCard
        key={index}
        name={item.symbol}
        price={item.current_price}
        image={item.image}
        percentage={item.price_change_percentage_24h.toFixed(2)}
        id={item.id}
      />
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div className="flex flex-col text-white 	mx-auto">
      <section
        className="h-[400px] w-full "
        style={{
          backgroundImage: `url(/banner.jpeg)`,
        }}
      >
        <div className="px-6 pt-7 h-full flex items-center flex-col w-4/5 mx-auto">
          <div className="flex flex-col w-full items-center h-1/2">
            <h2 className="text-6xl text-white font-semibold mb-4">
              Kripto Dünyası
            </h2>
            <h6 className="text-sm text-gray-500">
              En sevdiğiniz Kripto Para Birimi ile ilgili tüm Bilgileri alın{" "}
            </h6>
          </div>
          {isCarouselLoading ? (
            <div className="flex justify-center items-center w-full py-8 xl:px-0 transition-all">
              <LoadingSpinner />
            </div>
          ) : (
            <AliceCarousel
              items={items}
              mouseTracking
              infinite
              autoPlayInterval={1000}
              animationDuration={1500}
              disableDotsControls
              disableButtonsControls
              responsive={responsive}
              autoPlay
            />
          )}
        </div>
      </section>
      {isLoading ? (
        <div className="flex justify-center items-center w-full py-8 xl:px-0 transition-all">
          <LoadingSpinner />
        </div>
      ) : (
        <section
          ref={tableRef}
          className="flex flex-col items-center  px-6 xl:px-0 transition-all"
        >
          <div className="xl:w-10/12  w-full mx-auto">
            <h2 className="text-4xl m-5 p-4 font-semibold text-center">
              Kripto Paralar
            </h2>
            <div className="w-full ">
              <div className="mb-5">
                <input
                  type="text"
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  placeholder="Kripto Para Birimi Arayın.."
                  className="w-full  border border-gray-400 rounded outline-none bg-transparent py-2 px-4 h-14"
                />
              </div>
              <div>
                <CryptoTable
                  data={filteredData}
                  count={filteredData?.length}
                  page={page}
                  tableRef={tableRef}
                  setPage={setPage}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default index;
