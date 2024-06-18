import { useGetGameTrailers } from "@/hooks/AllGamesHooks/useGetGameTrailers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";
import SlideHeading from "../SlideHeading";

export default function Slide2({ game, screenShots }) {
  const { push } = useRouter();

  const data = useGetGameTrailers(game.id);

  return (
    <div className="h-full w-full flex flex-col md:gap-4 gap-2 snap-start relative lg:p-8 p-1 font-orbitron overflow-hidden">
      <SlideHeading title={game.name} />
      <Image
        priority
        className="absolute top-0 left-0 w-full h-full z-[-1] object-cover brightness-75"
        src={screenShots?.results?.[0]?.image || game.background_image}
        alt={game.name}
        width={600}
        height={600}
        blurDataURL="media.rawg.io"
        placeholder="blur"
      ></Image>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group md:p-5 p-3 duration-1000 hover:duration-1000 relative grow bg-[#38383855] backdrop-blur-[2px] rounded-xl overflow-hidden"
      >
        <div className="group-hover:-top-3 bg-transparent top-[50%] left-[30%] absolute shadow-yellow-300 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div className="group-hover:top-60 bg-transparent top-[20%] left-[40%] absolute shadow-red-300 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div className="group-hover:left-[80%] bg-transparent top-[24%] left-[60%] absolute shadow-sky-300 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div className="group-hover:top-[30%] bg-transparent top-[90%] left-[20%] absolute shadow-red-300 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
        <div className="group-hover:left-[44%] bg-transparent top-[60%] left-[25%] absolute shadow-green-300 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-44 h-44"></div>
        <div className="group-hover:-left-2 bg-transparent top-[80%] left-[12%] absolute shadow-sky-300 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-64 h-64"></div>
        <div className="group-hover:top-44 bg-transparent top-24 left-12 absolute shadow-sky-300 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-4 h-4"></div>
        <div className="game-description w-full h-full shadow-xl shadow-neutral-900 md:p-5 p-3 bg-[#00000097] opacity-80 rounded-xl flex-col gap-2 flex overflow-y-auto">
          <div className="flex flex-col gap-3 flex-wrap">
            <div className="flex gap-5 flex-wrap items-center">
              {data?.data?.results?.map((t) => (
                <div key={t.id} className="flex flex-col gap-1 w-[48%] grow">
                  <h1 className="font-bold">{t.name}</h1>
                  <video className="rounded-xl" poster={t.preview} controls>
                    <source src={`${t.data[480]}`} />
                  </video>
                </div>
              ))}
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <h1>Genre:</h1>{" "}
              {game.genres.map((g) => (
                <button
                  onClick={() => {
                    push(`/genres/${g.id}`);
                  }}
                  key={g.id}
                  className="bg-[#f3f3f3] text-black w-fit px-2 py-[1px] rounded-md text-[12px] font-semibold opacity-100 duration-500 hover:opacity-80 select-none active:scale-90"
                >
                  {g.name}
                </button>
              ))}
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <h1>Publishers:</h1>{" "}
              {game.publishers.map((p) => (
                <span
                  key={p.id}
                  className="bg-[#f3f3f3] text-black w-fit px-2 py-[1px] rounded-md text-[12px] font-semibold"
                >
                  {p.name}
                </span>
              ))}
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <h1>Tags:</h1>{" "}
              {game.tags.slice(0, 3).map((t) => (
                <span
                  key={t.id}
                  className="bg-[#f3f3f3] text-black w-fit px-2 py-[1px] rounded-md text-[12px] font-semibold"
                >
                  {t.name}
                </span>
              ))}
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <h1>Developers:</h1>{" "}
              {game.developers.map((d) => (
                <span
                  key={d.id}
                  className="bg-[#f3f3f3] text-black w-fit px-2 py-[1px] rounded-md text-[12px] font-semibold"
                >
                  {d.name}
                </span>
              ))}
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <h1>Platforms:</h1>{" "}
              {game.platforms.map((p) => (
                <button
                  onClick={() => {
                    push(`/platforms/${p.platform.id}`);
                  }}
                  key={p.platform.id}
                  className="bg-[#f3f3f3] text-black w-fit px-2 py-[1px] rounded-md text-[12px] font-semibold opacity-100 duration-500 hover:opacity-80 select-none active:scale-90"
                >
                  {p.platform.name}
                </button>
              ))}
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <h1>Website:</h1>{" "}
              <Link
                href={game.website}
                target="_blank"
                className="w-fit text-[12px] font-semibold opacity-85 underline hover:opacity-100 duration-300"
              >
                {game.website}
              </Link>
            </div>
            {game.platforms.map((p) =>
              p.requirements.minimum || p.requirements.recommended ? (
                <div key={p.platform.id} className="flex flex-col gap-2">
                  <h1>
                    {p.requirements.minimum &&
                      `System requirements for ${p.platform.name}`}
                  </h1>
                  <p className="w-fit text-[14px] opacity-85">
                    {p.requirements.minimum}
                  </p>
                  <p className="w-fit text-[14px] opacity-85">
                    {p.requirements.recommended}
                  </p>
                </div>
              ) : (
                <h1 key={p.platform.id}>
                  No System Requirements for {p.platform.name}
                </h1>
              )
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
