import WishlistPage from "@/Components/WishlistPage/WishlistPage";
import { getSession } from "next-auth/react";
import React from "react";

export default function wishlist() {
  return <WishlistPage />;
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
