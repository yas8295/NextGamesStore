import React from "react";
import { Skeleton, Tag } from "antd";
import { useGetGame } from "@/hooks/AllGamesHooks/useGetGame";
import { GiShoppingCart } from "react-icons/gi";
import Link from "next/link";
import { motion } from "framer-motion";
import CartButton from "../GameCard/CartButtons/CartButton";

export default function PopularGameDetails({ game }) {
  const { data, isLoading } = useGetGame(game.id);

  return (
    <div className="absolute left-0 bottom-0 w-full h-fit flex flex-col md:flex-row gap-4 md:py-5 md:px-7 p-2 bg-gradient-to-b from-[#00000000] to-[#3f36b9bb] md:rounded-b-3xl rounded-b-xl flex-wrap md:pb-8 pb-8 backdrop-blur-[2px] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        className="md:w-[30%] grow flex flex-col md:gap-3 gap-2"
      >
        <Link
          href={`/game/${game.id}`}
          className="md:text-[23px] text-[17px] capitalize font-semibold cursor-pointer w-fit bg-white hover:bg-[linear-gradient(93.25deg,#0098FF_4.45%,#7C34C8_93.88%)] bg-clip-text font-orbitron"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          {game.name}
        </Link>
        <div className="w-full flex self-start flex-wrap gap-2">
          {game.genres.map((g) => (
            <Tag
              onClick={() => {
                push(`/genres/${g.id}`);
              }}
              key={g.name}
              className="cursor-pointer m-0 md:text-[13px] text-[10px] py-1 px-3 opacity-100 duration-500 hover:opacity-80 select-none active:scale-90 bg-gradient-to-r from-[#0094d3] to-[#3f36b9] text-white border-0 rounded-2xl"
            >
              {g.name}
            </Tag>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        className="md:w-[40%] grow md:flex hidden flex-col gap-1"
      >
        <h1 className="font-orbitron uppercase font-semibold text-[15px]">
          Description
        </h1>
        {!isLoading ? (
          <p className="opacity-80 text-[16px]">
            {data?.description_raw.slice(0, 300)}
          </p>
        ) : (
          <Skeleton
            title={false}
            className="mb-2 h-[50%]"
            paragraph={{ rows: 4, width: "100%" }}
            active
          />
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        className="md:w-[40%] grow md:hidden flex flex-col gap-1"
      >
        <h1 className="font-orbitron uppercase font-semibold text-[13px]">
          Description
        </h1>
        <p className="opacity-80 text-[14px]">
          {data?.description_raw.slice(0, 150)}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        className="md:w-[20%] flex grow md:self-center self-end md:flex-col md:gap-2 gap-4 items-center justify-between md:px-3 px-1"
      >
        <CartButton
          key={game.id}
          game={{
            id: game.id,
            image: game.background_image,
            name: game.name,
            price: game?.playtime + 230,
          }}
        />
      </motion.div>
    </div>
  );
}
