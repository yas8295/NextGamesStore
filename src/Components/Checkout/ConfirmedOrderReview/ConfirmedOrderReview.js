import { useSession } from "next-auth/react";
import React from "react";
import ConfirmedOrderItem from "./ConfirmedOrderItem";

export default function ConfirmedOrderReview({ order, show = true }) {
  const { data: session, status } = useSession();

  const username = session?.user.name.split(" ");

  return (
    <div className="w-full flex flex-col md:mt-10 mt-5">
      {show && (
        <>
          {" "}
          <header className="text-center md:text-[25px] text-[20px]">
            Thank you for your purchase, {username?.[0]} {username?.[1]}!
          </header>
          <h1 className="mt-5 md:text-[17px] text-[15px]">
            <span className="font-semibold">Order ref:</span> {order?.reference}
          </h1>
        </>
      )}
      <div className="grid grid-rows-auto rounded-xl shadow-2xl backdrop-blur-2xl border-[1px] border-[#4ea4cd] bg-[#81aeb662] text-white w-full mt-4">
        <div className="grid grid-cols-4 sm:px-4 px-3 py-4 rounded-t-xl bg-[#123558] sm:text-[13px] text-[11px] font-semibold">
          <h1 className="col-span-2">ITEM</h1>
          <h1 className="text-right">QUANTITY</h1>
          <h1 className="text-right">AMOUNT</h1>
        </div>
        <div className="md:py-4 py-2">
          {order?.items?.map((item, i) => (
            <ConfirmedOrderItem
              key={item.gameId}
              id={item.gameId}
              quantity={item.quantity}
              amount={item.amount}
              border={i + 1 !== order?.items?.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
