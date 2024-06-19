import React from "react";
import { motion } from "framer-motion";
import CartButton from "./CartButtons/CartButton";
import GameCardImages from "./GameCardImages/GameCardImages";
import GameCardDetails from "./GameCardDetails/GameCardDetails";

export default function GameCard({
  id,
  images,
  name,
  rating,
  price,
  platforms,
  released,
  genres,
  layOut = false,
  width = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 60 }}
      viewport={{ once: true }}
      layout
      className={`p-[1.5px] ${width} grow rounded-[0px_15px] border-[double_1px_transparent] ${
        layOut
          ? "md:w-[90%] w-full min-h-[450px] max-h-full"
          : "w-80 overflow-hidden"
      } bg-[linear-gradient(to_right,#0098FF,#7C34C8)] origin-center`}
      style={{
        backgroundOrigin: "border-box",
        backgroundClip: "border-box",
      }}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 200, damping: 60 }}
        className={`flex ${
          layOut ? "md:flex-row flex-col" : "flex-col"
        } rounded-[0px_15px] w-full h-full min-h-[450px!important] backdrop-blur-lg bg-black bg-gradient-to-r from-[#2eceff36] to-[#00000000]`}
      >
        <GameCardImages
          layOut={layOut}
          images={images}
          id={id}
          name={name}
          rating={rating}
        />
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 200, damping: 60 }}
          className={`flex flex-col justify-between gap-3 md:min-h-60 min-h-fit grow ${
            layOut ? "md:py-7 md:px-5 px-3 pb-3" : "py-5 px-3"
          }`}
        >
          <GameCardDetails
            layOut={layOut}
            id={id}
            name={name}
            platforms={platforms}
            released={released}
            genres={genres}
          />
          <CartButton
            key={id}
            game={{
              id,
              image: images && images[0]?.image,
              name,
              price,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
