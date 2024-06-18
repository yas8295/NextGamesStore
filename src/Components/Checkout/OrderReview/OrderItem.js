import React from "react";
import { motion } from "framer-motion";
import PlatformsIcons from "@/Components/GameCard/PlatformsIcons";
import Image from "next/image";
import { useGetGame } from "@/hooks/AllGamesHooks/useGetGame";

export default function OrderItem({ id }) {
  const { data } = useGetGame(id);

  return (
    <div className="w-full h-full flex items-center gap-3">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
        }}
      >
        <Image
          src={data?.background_image}
          alt={data?.name}
          width={150}
          height={150}
          className={`rounded-lg object-cover min-w-16 w-16 h-16`}
        />
      </motion.div>
      <div className="flex flex-col grow gap-2 overflow-hidden">
        <div className="w-full flex justify-between gap-2">
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
                viewport={{ once: true }}
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
        </div>
        <div className="flex items-center justify-between gap-2 w-full">
          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className={`font-orbitron font-semibold md:text-[19px] text-[14px] text-wrap w-fit text-clip`}
          >
            {data?.name}
          </motion.h1>
        </div>
      </div>
    </div>
  );
}
