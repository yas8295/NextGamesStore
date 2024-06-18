import Layout from "@/Components/LayOut/layout";
import { Outfit, Orbitron } from "next/font/google";
import "@/styles/globals.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
import "react-toastify/dist/ReactToastify.css";
import Tostify from "@/UI/Toastify";
import { SessionProvider } from "next-auth/react";

const outfit = Outfit({ subsets: ["latin"] });
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            components: {
              Skeleton: {
                gradientFromColor: "#2a2a2a9e",
              },
              Segmented: {
                itemHoverBg: "white",
                colorTextDisabled: "#c5c5c5",
                itemPadding: "10px",
                itemActiveBg: "#c5c5c5",
              },
              Select: {
                colorText: "black",
                colorBorder: "transparent",
                colorTextPlaceholder: "#c5c5c5",
                selectorBg: "transparent",
              },
              Drawer: {
                colorIcon: "white",
                colorText: "white",
              },
              Input: {
                colorTextPlaceholder: "#c5c5c5",
                fontSizeIcon: "18px",
              },
              Empty: {
                colorTextDescription: "#c5c5c5",
                opacityImage: "0.4",
              },
              Steps: {
                colorText: "white",
                colorTextLabel: "white",
                colorTextDisabled: "rgba(0, 0, 0, 0.25)",
              },
            },
          }}
        >
          <Tostify />
          <Layout className={(outfit.className, orbitron.variable)}>
            <Component {...pageProps} />
          </Layout>
        </ConfigProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
