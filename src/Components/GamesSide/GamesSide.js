import React, { useEffect, useState } from "react";
import GameCard from "../GameCard/GameCard.js";
import GamesSideHeaderSection from "../GamesSideHeaderSection/GamesSideHeaderSection.js";
import { LoadingOutlined } from "@ant-design/icons";
import { useInView } from "react-intersection-observer";
import { useAllGames } from "../../hooks/AllGamesHooks/useAllGames.js";
import { getMonth as thisMonth } from "@/helpers/helpers.js";
import { getMonth } from "date-fns";
import NoMoreGamesDiv from "@/UI/NoMoreGamesDiv.js";
import { motion } from "framer-motion";
import LoadingGamesComponent from "./LoadingGamesComponent.js";
import ErrorComponent from "./ErrorComponent.js";

export default function GamesSide({
  Key,
  platform,
  genre,
  games,
  titleOfCategory,
  description = "",
}) {
  const { ref, inView } = useInView({});
  const [layOut, setLayOut] = useState("");
  const [month, setMonth] = useState(
    titleOfCategory === "release calendar"
      ? thisMonth(getMonth(new Date()))
      : null
  );
  const [order, setOrder] = useState("");
  const [sort, setSort] = useState("");
  const [parentPlatforms, setParentPaltforms] = useState(null);
  const [platforms, setPaltforms] = useState(platform || null);
  const [genres, setGenres] = useState(genre || null);
  const [tags, setTags] = useState(null);

  const sortOrder = sort + order;

  const metacritic = Key === "alltimetop" && "90,100";

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    errorFetchNextPage,
    isFetching,
  } = useAllGames(
    Key,
    month,
    sortOrder,
    parentPlatforms,
    platforms,
    genres,
    tags,
    metacritic
  );

  useEffect(() => {
    setPaltforms(platform);
  }, [platform]);

  useEffect(() => {
    setGenres(genre);
  }, [genre]);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (
    error ||
    status === "error" ||
    (status !== "loading" && data?.pages[0].games === undefined) ||
    !games
  ) {
    return <ErrorComponent></ErrorComponent>;
  }

  return (
    <>
      <GamesSideHeaderSection
        titleOfCategory={titleOfCategory}
        description={description}
        layOut={layOut}
        setLayOut={setLayOut}
        month={month}
        setMonth={setMonth}
        status={status}
        order={order}
        setOrder={setOrder}
        sort={sort}
        setSort={setSort}
        setParentPaltforms={setParentPaltforms}
        setPaltforms={setPaltforms}
        tags={tags}
        setTags={setTags}
      ></GamesSideHeaderSection>
      {status !== "loading" ? (
        <motion.div
          initial={{ opacity: 0, y: "10%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`flex items-center justify-center ${
            layOut ? "flex-col gap-20 mt-10" : "gap-5 mt-5"
          } w-full flex-wrap`}
        >
          {data?.pages
            ?.flatMap((pages) => pages.games)
            .flatMap((games) => games)
            .map((games) => games?.results) &&
            data?.pages
              ?.flatMap((pages) => pages.games)
              .flatMap((games) => games)
              .map((games) => games?.results)
              .flatMap((games) => games)
              .map(
                (game) =>
                  game && (
                    <GameCard
                      id={game?.id}
                      key={game?.id}
                      images={game?.short_screenshots}
                      name={game?.name}
                      rating={game?.rating}
                      price={game?.playtime + 230}
                      platforms={game?.parent_platforms}
                      released={game?.released}
                      genres={game?.genres}
                      layOut={layOut}
                    ></GameCard>
                  )
              )}
        </motion.div>
      ) : (
        <LoadingGamesComponent layOut={layOut}></LoadingGamesComponent>
      )}
      {(status === "success" ||
        data?.pages[data?.pages.length - 1].games?.next !== null ||
        hasNextPage ||
        data?.pages[0].length) &&
        data?.pages[data?.pages.length - 1]?.games?.detail !==
          "Invalid page." && (
          <div
            className="w-full flex justify-center items-center my-7"
            ref={ref}
          >
            {isFetchingNextPage && !errorFetchNextPage && (
              <LoadingOutlined className="text-[40px] text-[#3aadeb]" />
            )}
            {errorFetchNextPage && (
              <h1 className="text-[25px]">⛔ Check your network...</h1>
            )}
          </div>
        )}
      {data?.pages[data?.pages.length - 1]?.games?.detail === "Invalid page." &&
        !data?.pages[data?.pages.length - 1].length &&
        !isFetching &&
        !isFetchingNextPage &&
        !data?.pages[0].length && (
          <div className="w-full flex justify-center items-center my-7">
            <NoMoreGamesDiv></NoMoreGamesDiv>
          </div>
        )}
    </>
  );
}
