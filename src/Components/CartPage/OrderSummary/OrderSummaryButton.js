import React from "react";
import { motion } from "framer-motion";

export default function OrderSummaryButton({
  className = "",
  children,
  isLoading,
  mutate = undefined,
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      disabled={isLoading}
      onClick={() => {
        mutate && mutate({ method: "DELETE", operation: "ALL" });
      }}
      className={`md:text-[22px] text-[18px] py-2 items-center justify-center rounded-md flex border-[1.5px] border-[#ffffff] shadow-xl ${className} hover:opacity-80 text-white hover:text-white cursor-pointer active:scale-[0.95] disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {children}
    </motion.button>
  );
}
