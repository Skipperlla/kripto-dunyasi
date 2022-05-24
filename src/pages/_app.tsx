import "@assets/styles/globals.css";
import "moment/locale/tr";
import "@utils/lib/icons";
import "react-alice-carousel/lib/alice-carousel.css";

import Head from 'next/head'
import MainLayout from "@layout/MainLayout";
import type { AppProps } from "next/app";
import { CoinProvider } from "@utils/context/CoinContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CoinProvider>
      <MainLayout>
        <Head>
          <title>Kripto Dünyası</title>
        </Head>
        <Component {...pageProps} />
      </MainLayout>
    </CoinProvider>
  );
}

export default MyApp;
