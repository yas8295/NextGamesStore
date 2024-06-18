import OrdersPage from "@/Components/OrdersPage/OrdersPage";
import React from "react";
import { getSession } from "next-auth/react";

export default function orders() {
  return <OrdersPage />;
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
