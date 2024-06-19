import Layout from "@/Components/LayOut/layout";
import { Outfit, Orbitron } from "next/font/google";
import "@/styles/globals.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import Tostify from "@/UI/Toastify";
import { SessionProvider } from "next-auth/react";
import AntThemes from "@/styles/antThemes";

const outfit = Outfit({ subsets: ["latin"] });
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
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
        <AntThemes>
          <Tostify />
          <Layout className={(outfit.className, orbitron.variable)}>
            <Component {...pageProps} />
          </Layout>
        </AntThemes>
      </QueryClientProvider>
    </SessionProvider>
  );
}
