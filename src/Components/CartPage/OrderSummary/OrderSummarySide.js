import { useMutateCart } from "@/hooks/MongoDB/cart/useMutateCart";
import { Popover } from "antd";
import React from "react";
import { BsQuestionOctagonFill } from "react-icons/bs";
import { motion } from "framer-motion";
import OrderSummaryButton from "./OrderSummaryButton";
import Link from "next/link";
import { FaTags } from "react-icons/fa6";
import { MdRemoveShoppingCart } from "react-icons/md";
import { LoadingOutlined } from "@ant-design/icons";

export default function OrderSummarySide({ cart }) {
  const { mutate, isLoading } = useMutateCart();

  const totalPrice = cart?.cart?.cart.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);

  const tax = totalPrice * 0.03;

  return (
    <motion.div
      initial={{ opacity: 0, x: "10%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="xl:min-w-[40%] w-full grow self-start flex flex-col gap-4 rounded-lg py-10 md:px-7 px-3 bg-[#afc3f7e4] backdrop-blur-sm text-black relative before:absolute before:z-[1] before:top-[0] before:left-0 before:w-[100%] before:h-[8px] before:bg-gradient-to-r before:from-[#119cd7] before:to-[#6a29e8] after:absolute after:bottom-[0px] after:right-0 after:w-[100%] after:h-[8px] after:bg-gradient-to-r after:from-[#6a29e8] after:to-[#119cd7]"
    >
      <header className="md:text-[25px] text-[20px] font-semibold mb-3">
        Order summary
      </header>
      <div className="flex justify-between items-center gap-2 border-b-[1px] border-gray-300 pb-4">
        <h1 className="md:text-[20px] text-[17px]">Subtotal</h1>
        <p className="md:text-[20px] text-[17px] font-semibold">
          ${totalPrice?.toFixed(2)}
        </p>
      </div>
      <div className="flex justify-between items-center gap-2 border-b-[1px] border-gray-300 pb-4">
        <h1 className="md:text-[20px] text-[17px] flex items-center gap-2">
          Tax estimate{" "}
          <Popover
            overlayClassName="md:max-w-[300px]"
            arrow={false}
            content={
              <div>
                <p>
                  Enter the estimated amount of tax you expect to pay for the
                  current fiscal year.
                </p>
                <p>
                  This helps in planning your finances and ensuring you set
                  aside adequate funds for tax payments.
                </p>
              </div>
            }
            title="Tax estimate"
          >
            <BsQuestionOctagonFill className="cursor-pointer hover:opacity-60 duration-300" />
          </Popover>
        </h1>
        <p className="md:text-[20px] text-[17px] font-semibold">
          ${(totalPrice * 0.03).toFixed(2)}
        </p>
      </div>
      <div className="flex justify-between items-center gap-2 py-2">
        <h1 className="md:text-[22px] text-[19px] font-semibold">
          Order Total
        </h1>
        <p className="md:text-[22px] text-[19px] font-semibold">
          ${totalPrice + tax}
        </p>
      </div>
      <OrderSummaryButton className="mt-2 bg-[#3b2dc1]" isLoading={isLoading}>
        <Link
          href="/checkout"
          className=" flex items-center justify-center gap-3 w-full"
        >
          Checkout <FaTags />
        </Link>
      </OrderSummaryButton>
      <OrderSummaryButton
        className="bg-[#a82d5c]"
        isLoading={isLoading}
        mutate={mutate}
      >
        <div>
          {isLoading ? (
            <LoadingOutlined />
          ) : (
            <h1 className="flex items-center gap-3">
              Clear cart
              <MdRemoveShoppingCart />
            </h1>
          )}
        </div>
      </OrderSummaryButton>
    </motion.div>
  );
}
