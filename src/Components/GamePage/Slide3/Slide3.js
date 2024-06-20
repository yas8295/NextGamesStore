import { useGetGameAchievements } from "@/hooks/AllGamesHooks/useGetGameAchievements";
import Image from "next/image";
import React from "react";
import { TfiCup } from "react-icons/tfi";
import { motion } from "framer-motion";
import SlideHeading from "../SlideHeading";

export default function Slide3({ game, screenShots }) {
  const data = useGetGameAchievements(game.id);

  return (
    <div className="h-full w-full flex flex-col justify-start md:gap-4 gap-2 snap-start relative lg:p-8 px-1 py-2 font-orbitron">
      <h1 className="flex justify-between items-center gap-2 font-extrabold px-2">
        <SlideHeading title={game.name} />
        <TfiCup className="md:text-[75px] text-[50px]" />
      </h1>
      <Image
        className="absolute top-0 left-0 w-full h-full z-[-1] object-cover brightness-75"
        src={screenShots?.results?.[1]?.image || game.background_image}
        alt={game.name}
        blurDataURL=""
      ></Image>
      <div className="game-description flex items-center self-center gap-3 flex-wrap overflow-auto">
        {data?.data?.results.length ? (
          data?.data?.results?.map((achievement, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={achievement.id}
              className="flex items-center md:w-[32%] py-1 px-3 grow min-h-[130px] self-stretch bg-[#ffffffa0] backdrop-blur-md rounded-md shadow-lg"
            >
              <Image
                className="w-16 h-16 object-cover rounded-xl hover:scale-110 duration-300"
                src={achievement?.image}
                alt={game.name}
                width={1200}
                height={1200}
                blurDataURL="media.rawg.io"
              ></Image>
              <section className="block border-l border-gray-300 m-3">
                <div className="pl-3">
                  <h1 className="text-gray-900 font-semibold text-sm">
                    {achievement.percent}%
                  </h1>
                  <h1 className="bg-clip-text text-transparent bg-gradient-to-l from-[#00b7c4] to-[#27272A] md:text-lg text-md font-bold">
                    {achievement.name}
                  </h1>
                  <h1 className="text-gray-900 opacity-80 font-semibold md:text-sm text-[11px]">
                    {achievement.description}
                  </h1>
                </div>
              </section>
            </motion.div>
          ))
        ) : (
          <div className="flex justify-center items-center mx-auto md:p-5 p-2 bg-[#ffffffa0] backdrop-blur-md rounded-md shadow-lg mt-5 w-fit">
            <h1 className="md:text-3xl text-xl font-bold text-center">
              No achievements for this game
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
