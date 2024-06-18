import CartPage from "@/Components/CartPage/CartPage";
import { getSession } from "next-auth/react";
import React from "react";

export default function cart() {
  return <CartPage />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session },
  };
}
