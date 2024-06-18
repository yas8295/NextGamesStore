import React from "react";
import CartItem from "./CartItem";
import { motion } from "framer-motion";

export default function CartItemsSide({ cart }) {
  return (
    <div className="grow flex flex-col min-w-[50%] xl:max-w-[55%]">
      {cart?.cart?.cart?.map((game, i) => (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.5 }}
          key={game.gameId}
          className={`w-full flex sm:flex-row flex-col ${
            i === cart?.cart?.cart?.length - 1 ? "mb-0" : "md:mb-9 mb-6"
          } relative before:absolute before:z-[1] before:top-[0] before:left-0 before:w-[100%] before:h-[5px] before:bg-gradient-to-r before:from-[#119cd7] before:to-[#6a29e8] after:absolute after:bottom-[0px] after:right-0 after:w-[100%] after:h-[5px] after:bg-gradient-to-r after:from-[#6a29e8] after:to-[#119cd7] overflow-hidden`}
        >
          <CartItem
            id={game.gameId}
            quantity={game.quantity}
            price={game.price}
          />
        </motion.div>
      ))}
    </div>
  );
}
