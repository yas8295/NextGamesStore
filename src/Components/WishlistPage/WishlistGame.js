import { useGetGame } from "@/hooks/AllGamesHooks/useGetGame";
import { useGetGameScreenShots } from "@/hooks/AllGamesHooks/useGetGameScreenShots";
import React from "react";
import GameCard from "../GameCard/GameCard";
import SkeletonComponent from "../GamesSide/SkeletonComponent";

export default function WishlistGame({ layOut, id }) {
  const { data: game, isLoading, isError } = useGetGame(id);
  const { data: gameImages } = useGetGameScreenShots(id);

  if (isLoading) {
    return <SkeletonComponent layOut={layOut} />;
  }

  if ((isError || !game) && !isLoading) {
    return <SkeletonComponent layOut={layOut} />;
  }

  const images = Array.of(gameImages?.results);

  return (
    game &&
    gameImages && (
      <GameCard
        id={game.id}
        images={[...images, { image: game?.background_image }].flat().reverse()}
        name={game.name}
        rating={game.rating}
        price={game.playtime + 230}
        platforms={game?.parent_platforms}
        released={game.released}
        genres={game.genres}
        layOut={layOut}
      />
    )
  );
}
