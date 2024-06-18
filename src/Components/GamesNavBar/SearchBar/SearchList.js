import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import GameItems from "./GameItems";

export default function SearchList({
  search,
  setSearch,
  data,
  isLoading,
  isFetching,
  fetchNextPage,
}) {
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target !== ref.current && e.target.parentNode !== ref.current)
        setSearch("");
    });
  }, [setSearch]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      layout
      exit={{ opacity: 0, scale: 0 }}
      className={`flex flex-col gap-4 px-3 py-5 absolute md:mt-3 ${
        search && "absolute md:top-[100%] md:rounded-3xl rounded-none"
      } left-0 w-full h-[400px] max-h-[400px] overflow-y-auto bg-white z-[99] rounded-3xl bg-[linear-gradient(50deg,rgb(9_40_50),hsl(253deg_85%_10%)48%,hsl(264deg_89%_6%)60%,hsl(0deg_0%_0%)100%)] border border-[#4633b1] shadow-2xl`}
    >
      {data?.pages[data?.pages.length - 1]?.count !== 0 &&
        !isLoading &&
        data?.pages[0] !== undefined && (
          <h1 className="font-semibold">
            Found{" "}
            <span className="opacity-70">
              {data?.pages[data?.pages.length - 1]?.count}
            </span>{" "}
            games
          </h1>
        )}
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
          <LoadingOutlined className="text-[40px] text-[#3aadeb]" />
        </div>
      )}
      {!data?.pages[data?.pages.length - 1]?.count && !isLoading && (
        <Empty
          className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] m-0"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No games found"
        />
      )}
      <AnimatePresence mode="sync">
        {data?.pages?.map((page) =>
          page?.results.map((game) => <GameItems key={game.id} game={game} />)
        )}
      </AnimatePresence>
      {!isLoading &&
      data?.pages[data?.pages.length - 1]?.count &&
      data?.pages[data?.pages.length - 1]?.next !== null ? (
        <button
          onClick={() => fetchNextPage()}
          className="w-28 rounded-md text-[13px] mx-auto bg-white text-[#000000] py-2 my-3 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#8d0cbd,-0.5rem_-0.5rem_#38b3b5] transition font-orbitron"
        >
          {isFetching ? (
            <LoadingOutlined className="text-[16px] text-[#000000]" />
          ) : (
            "Load more"
          )}
        </button>
      ) : (
        ""
      )}
    </motion.div>
  );
}
