import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";
import PlatformsIcons from "@/Components/GameCard/PlatformsIcons";

export default function GameItems({ game }) {
  const { push } = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 60 },
      }}
      exit={{ opacity: 0, x: -100 }}
      className="flex items-center gap-3"
    >
      {game.background_image && (
        <Image
          width={200}
          height={200}
          onClick={() => push(`game/${game.id}`)}
          src={game.background_image}
          alt={game.name}
          className={`hover:opacity-70 duration-300 cursor-pointer object-cover w-14 h-14 rounded-xl`}
        />
      )}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-[7px]">
          {game.platforms?.slice(0, 3).map((p) => (
            <h1 className="md:text-[18px] text-[15px]" key={p.platform.name}>
              <PlatformsIcons name={p.platform.name} />
            </h1>
          ))}
        </div>
        <Link
          href={`/game/${game.id}`}
          className="font-semibold hover:opacity-70 duration-300"
        >
          {game.name}
        </Link>
      </div>
    </motion.div>
  );
}
