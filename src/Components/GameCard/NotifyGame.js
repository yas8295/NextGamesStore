import Image from "next/image";
import React from "react";
import { useGetGame } from "@/hooks/AllGamesHooks/useGetGame";
import { motion } from "framer-motion";
import CartOperationButtons from "./CartButtons/CartOperationButtons";
import PlatformsIcons from "./PlatformsIcons";
import { useRouter } from "next/router";
import CartDeleteGameButton from "./CartButtons/CartDeleteGameButton";
import LoadingBadgeItem from "../GamesNavBar/CartBadge/LoadingBadgeItem";

export default function NotifyGame({
  message = null,
  game = null,
  id = undefined,
  cart = undefined,
}) {
  const { data } = useGetGame(id);
  const { push } = useRouter();

  if (cart && !data) {
    return <LoadingBadgeItem />;
  }

  if (!cart && !data) {
    return <LoadingBadgeItem />;
  }

  return (
    <div className="w-full h-fit flex items-center gap-3">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <Image
          onClick={() => {
            push(`/game/${id}`);
          }}
          src={game?.image || data?.background_image}
          alt={game?.name || data?.name}
          width={150}
          height={150}
          className={`duration-300 rounded-lg object-cover min-w-16 w-16 h-16 hover:opacity-75 cursor-pointer`}
        />
      </motion.div>
      <div className="flex flex-col grow gap-2 overflow-hidden">
        <div className="w-full flex justify-between gap-2">
          {cart && (
            <CartOperationButtons
              key={id}
              game={{ id, image: data?.background_image, name: data?.name }}
              cart={cart}
              id={id}
            />
          )}
          {id && !cart && (
            <div className="flex items-center gap-[3px]">
              {data?.platforms?.slice(0, 3).map((p, i) => (
                <motion.h1
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    delay: i * 0.2,
                  }}
                  className="md:text-[17px] text-[14px]"
                  key={p.platform.name}
                >
                  <PlatformsIcons name={p.platform.name} />
                </motion.h1>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 w-full">
          <motion.h1
            onClick={() => {
              push(`/game/${id}`);
            }}
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.2 }}
            className={`duration-300 font-orbitron font-semibold md:text-[19px] text-[16px] text-wrap hover:text-[gray] cursor-pointer w-fit text-clip`}
          >
            {game?.name || data?.name}
          </motion.h1>
          {cart && (
            <CartDeleteGameButton
              game={{ id, image: data?.background_image, name: data?.name }}
            />
          )}
        </div>
        {message && (
          <p className="md:text-[20px] text-[15px] text-wrap">{message}</p>
        )}
      </div>
    </div>
  );
}
