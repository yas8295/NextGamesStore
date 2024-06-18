import { useGetGame } from "@/hooks/AllGamesHooks/useGetGame";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LoadingOutlined } from "@ant-design/icons";

export default function OrderItemsField({ id }) {
  const { data: game, isLoading, isError } = useGetGame(id);

  return (
    <div className="flex gap-3 items-center">
      {isLoading || isError ? (
        <LoadingOutlined className="text-[30px] text-[#3aadeb]" />
      ) : (
        <>
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
              src={game?.background_image}
              alt={game?.name}
              width={150}
              height={150}
              className={`rounded-lg object-cover min-w-12 w-12 h-12 drop-shadow-2xl`}
            />
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.2 }}
            className={`font-orbitron md:text-[13px] text-[10px] text-nowrap text-ellipsis overflow-hidden`}
          >
            {game?.name}
          </motion.h1>
        </>
      )}
    </div>
  );
}
