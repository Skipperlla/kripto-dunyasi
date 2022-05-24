import "@assets/styles/globals.css";
import "moment/locale/tr";
import "@utils/lib/icons";
import "react-alice-carousel/lib/alice-carousel.css";

import MainLayout from "@layout/MainLayout";
import type { AppProps } from "next/app";
import { CoinProvider } from "@utils/context/CoinContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CoinProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </CoinProvider>
  );
}

export default MyApp;
