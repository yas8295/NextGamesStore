import React from "react";
import { Tag, Skeleton } from "antd";
import Link from "next/link";
import { motion } from "framer-motion";
import PlatformsIcons from "../PlatformsIcons";
import { useRouter } from "next/router";
import { useGetGame } from "@/hooks/AllGamesHooks/useGetGame";

export default function GameCardDetails({
  layOut,
  id,
  name,
  platforms,
  released,
  genres,
}) {
  const { push } = useRouter();

  const { data } = useGetGame(id);
  const description = data?.description_raw;

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 200, damping: 60 }}
      className="flex flex-col gap-2"
    >
      {layOut && (
        <>
          <Link
            href={`/game/${id}`}
            className="md:text-[23px] text-[19px] capitalize font-semibold cursor-pointer w-fit bg-white hover:bg-[linear-gradient(93.25deg,#0098FF_4.45%,#7C34C8_93.88%)] bg-clip-text font-orbitron self-center mb-2"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            {name}
          </Link>
          <div className="w-full h-[1px] bg-[linear-gradient(to_right,transparent,#818078,transparent)] mb-5"></div>
        </>
      )}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-[7px]">
          {platforms?.slice(0, 3).map((p) => (
            <h1 className="md:text-[25px] text-[20px]" key={p.platform.name}>
              <PlatformsIcons name={p.platform.name} />
            </h1>
          ))}
        </div>
        <h1 className="font-orbitron text-[14px]">
          {new Date(released).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </h1>
      </div>
      {!layOut && (
        <Link
          href={`/game/${id}`}
          className="md:text-[23px] text-[19px] capitalize font-semibold cursor-pointer w-fit bg-white hover:bg-[linear-gradient(93.25deg,#0098FF_4.45%,#7C34C8_93.88%)] bg-clip-text font-orbitron"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          {name}
        </Link>
      )}
      {layOut && (
        <motion.h1
          animate={{ scale: 1, opacity: 1 }}
          layout
          transition={{ type: "spring", stiffness: 80 }}
          className="md:block hidden my-3"
        >
          {description ? (
            `${description?.slice(0, 500)}.`
          ) : (
            <Skeleton
              title={false}
              className="mb-2 h-[50%]"
              paragraph={{ rows: 4, width: "100%" }}
              active
            />
          )}
        </motion.h1>
      )}
      <div
        className={`flex items-center flex-wrap gap-1 ${
          layOut && "self-center"
        }`}
      >
        <h1 className="me-1 md:text-[17px] text-[15px]">Genres:</h1>
        {genres?.map((g) => (
          <Tag
            onClick={() => {
              push(`/genres/${g.id}`);
            }}
            key={g.name}
            className="cursor-pointer text-[13px] opacity-100 duration-500 hover:opacity-80 select-none active:scale-90 bg-gradient-to-r from-[#0094d3] to-[#3f36b9] text-white border-0"
          >
            {g.name}
          </Tag>
        ))}
      </div>
    </motion.div>
  );
}
