import React from "react";
import { format } from "date-fns";
import { Rate } from "antd";
import { motion } from "framer-motion";
import SlideHeading from "../SlideHeading";
import WishListButton from "@/Components/GameCard/WishListButton";
import CartButton from "@/Components/GameCard/CartButtons/CartButton";
import PlatformsIcons from "@/Components/GameCard/PlatformsIcons";
import Link from "next/link";
import { HiHome } from "react-icons/hi2";

export default function GameDetails({ game }) {
  return (
    <div className="game-details md:w-[73%] w-full flex flex-col justify-between md:min-h-full h-[86%] md:p-7 px-2 py-5 font-orbitron gap-4 md:rounded-l-3xl rounded-t-3xl overflow-y-auto overflow-x-hidden">
      <div className="flex w-full items-center md:gap-2 gap-1 md:text-[14px] text-[12px]">
        <Link href={"/home"}>
          <HiHome className="opacity-65 hover:opacity-100 duration-200 md:text-[23px] text-[20px]" />
        </Link>
        /<h1>{game?.name}</h1>
      </div>
      <div className="flex justify-between items-center gap-3">
        <h1 className="bg-[#f3f3f3] text-black self-start w-full px-2 py-[1px] rounded-md text-[12px] font-semibold">
          {format(new Date(game.released), "MMM, dd, yyyy")}
        </h1>
        <div className="flex items-center gap-[7px]">
          {game?.parent_platforms?.slice(0, 3).map((p) => (
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-[25px]"
              key={p.platform.name}
            >
              <PlatformsIcons name={p.platform.name} />
            </motion.h1>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:gap-0 gap-3 grow mt-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <SlideHeading title={game.name} />
            <Rate
              disabled
              className={`md:text-[18px] text-[15px] bg-[#37373778] shadow-2xl rounded-3xl p-2 self-center`}
              defaultValue={game.rating}
            ></Rate>
          </div>
          <div className="scale-110 bg-[#37373778] shadow-2xl rounded-3xl p-2 text-center">
            <WishListButton
              game={{
                id: game.id,
                image: game.background_image,
                name: game.name,
              }}
            ></WishListButton>
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="game-description md:max-h-[270px] sm:max-h-[300px] max-h-[180px] md:text-[16px] text-[15px] md:leading-7 leading-6 overflow-y-auto p-2 opacity-90 mt-2 backdrop-blur-[2px] font-sans"
        >
          {game.description_raw}
        </motion.p>
      </div>
      <CartButton
        key={game.id}
        game={{
          id: game.id,
          image: game.background_image,
          name: game.name,
          price: game?.playtime + 230,
        }}
      />
    </div>
  );
}
