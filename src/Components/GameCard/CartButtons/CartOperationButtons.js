import React from "react";
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import { useMutateCart } from "@/hooks/MongoDB/cart/useMutateCart";
import { LoadingOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

export default function CartOperationButtons({
  game,
  cart = undefined,
  id,
  quantity = undefined,
}) {
  const itemQuantity = cart?.cart?.cart?.find((g) => g.gameId === id).quantity;
  const itemTotalPrice =
    cart?.cart?.cart?.find((g) => g.gameId === id).quantity *
    cart?.cart?.cart?.find((g) => g.gameId === id).price;

  const { mutate, isLoading } = useMutateCart();

  return (
    <>
      <div className={`flex items-center ${cart ? "gap-[9px]" : "gap-[15px]"}`}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          whileInView={{
            scale: 1,
            transition: { delay: 0.5, stiffness: 160, type: "spring" },
          }}
          disabled={isLoading}
          onClick={() => {
            mutate({
              game,
              method: itemQuantity === 1 ? "DELETE" : "PUT",
              operation: itemQuantity === 1 ? "" : "DEC",
            });
          }}
          className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white p-1 text-base hover:border-[#e73bc7] cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          <TiMinus className="text-[15px]" />
        </motion.button>
        <p className="md:text-[20px] text-[17px] font-semibold">
          {isLoading ? <LoadingOutlined /> : itemQuantity || quantity}
        </p>
        <motion.button
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          whileInView={{
            scale: 1,
            transition: { delay: 0.5, stiffness: 160, type: "spring" },
          }}
          disabled={isLoading}
          onClick={() => {
            mutate({ game, method: "PUT", operation: "INC" });
          }}
          className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white p-1 text-base hover:border-[#3bc2e7] cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          <FaPlus className="text-[15px]" />
        </motion.button>
      </div>
      {cart && (
        <h1 className="md:text-[20px] text-[17px] font-semibold">
          ${itemTotalPrice.toFixed(2)}
        </h1>
      )}
    </>
  );
}
