import React, { useState } from "react";
import HeaderTitle from "../GamesSideHeaderSection/HeaderTitle";
import { motion } from "framer-motion";
import ViewButtons from "../GamesSideHeaderSection/ViewButtons";
import WishlistGame from "./WishlistGame";
import { useGetWishlist } from "@/hooks/MongoDB/wishlist/useGetWishlist";
import { LoadingOutlined } from "@ant-design/icons";
import EmptyWishlist from "./EmptyWishlist";
import ErrorComponent from "../GamesSide/ErrorComponent";

export default function WishlistPage() {
  const [layOut, setLayOut] = useState("");

  const { data: wishList, isLoading, isError } = useGetWishlist();

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <>
      <HeaderTitle titleOfCategory="wishlist" />
      {wishList &&
        !isLoading &&
        wishList?.wishList?.wishlist.length !== 0 &&
        wishList?.wishList?.wishlist.length !== 1 && (
          <div className="w-full md:flex justify-end hidden">
            <ViewButtons setLayOut={setLayOut} />
          </div>
        )}
      {wishList && !isLoading ? (
        <motion.div
          initial={{ opacity: 0, y: "10%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`flex items-center justify-center ${
            layOut ? "flex-col gap-20 mt-10" : "gap-5 mt-10"
          } w-full flex-wrap`}
        >
          {wishList?.wishList?.wishlist.map((game) => (
            <WishlistGame
              key={game.gameId}
              id={game.gameId}
              layOut={
                wishList?.wishList?.wishlist.length === 1 ? "column" : layOut
              }
            />
          ))}
        </motion.div>
      ) : (
        <div className="w-full mt-20 flex justify-center items-center">
          <LoadingOutlined className="text-[40px] text-[#3aadeb]" />
        </div>
      )}
      {wishList && wishList?.wishList?.wishlist.length === 0 && !isLoading && (
        <EmptyWishlist />
      )}
    </>
  );
}
