import GameCard from "@/Components/GameCard/GameCard";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetGameSeries } from "@/hooks/AllGamesHooks/useGetGameSeries";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useGetGameDlc } from "@/hooks/AllGamesHooks/useGetGameDlc";
import { useGetParentGame } from "@/hooks/AllGamesHooks/useGetParentGame";
import SlideHeading from "../SlideHeading";

export default function Slide4({ game, screenShots }) {
  const { data, isLoading } = useGetGameSeries(game.id);
  const { data: dlcGames } = useGetGameDlc(game.id);
  const { data: parentGame } = useGetParentGame(game.id);

  if (
    data?.results?.length === 0 &&
    dlcGames?.results?.length === 0 &&
    parentGame?.results?.length === 0
  ) {
    return;
  }

  return (
    <div className="h-fit min-h-screen w-full flex flex-col justify-between md:gap-4 gap-2 snap-start relative lg:p-3 p-2 font-orbitron">
      <SlideHeading title={`Series of ${game.name}`} />
      {
        <Image
          className="absolute top-0 left-0 w-full h-full z-[-1] object-cover brightness-75"
          src={
            screenShots?.results?.[3]?.image ||
            screenShots?.results?.[0]?.image ||
            game.background_image
          }
          alt={game.name}
          width={600}
          height={600}
        ></Image>
      }
      {!isLoading ? (
        <Swiper
          mousewheel={{ enabled: true, releaseOnEdges: true }}
          lazy="true"
          slidesPerView={1}
          spaceBetween={15}
          navigation={true}
          modules={[Navigation, Mousewheel]}
          centeredSlides={true}
          className={`flex items-center justify-center w-full flex-wrap md:mt-10 grow`}
        >
          {data?.results?.map(
            (similarGame) =>
              (similarGame, similarGame.name !== game.name) && (
                <SwiperSlide key={similarGame?.id}>
                  <GameCard
                    id={similarGame?.id}
                    images={similarGame?.short_screenshots}
                    name={similarGame?.name}
                    rating={similarGame?.rating}
                    price={similarGame?.playtime + 230}
                    platforms={similarGame?.parent_platforms}
                    released={similarGame?.released}
                    genres={similarGame?.genres}
                    width="w-[100%!important]"
                    layOut={true}
                  ></GameCard>
                </SwiperSlide>
              )
          )}
          {dlcGames?.results?.map(
            (dlcGame) =>
              (dlcGame, dlcGame.name !== game.name) && (
                <SwiperSlide key={dlcGame?.id}>
                  <GameCard
                    id={dlcGame?.id}
                    images={dlcGame?.short_screenshots}
                    name={dlcGame?.name}
                    rating={dlcGame?.rating}
                    price={dlcGame?.playtime + 230}
                    platforms={dlcGame?.parent_platforms}
                    released={dlcGame?.released}
                    genres={dlcGame?.genres}
                    width="w-[100%!important]"
                    layOut={true}
                  ></GameCard>
                </SwiperSlide>
              )
          )}
          {parentGame?.results?.map(
            (parentOfGame) =>
              (parentOfGame, parentOfGame.name !== game.name) && (
                <SwiperSlide key={parentOfGame?.id}>
                  <GameCard
                    id={parentOfGame?.id}
                    images={parentOfGame?.short_screenshots}
                    name={parentOfGame?.name}
                    rating={parentOfGame?.rating}
                    price={parentOfGame?.playtime + 230}
                    platforms={parentOfGame?.parent_platforms}
                    released={parentOfGame?.released}
                    genres={parentOfGame?.genres}
                    width="w-[100%!important]"
                    layOut={true}
                  ></GameCard>
                </SwiperSlide>
              )
          )}
        </Swiper>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingOutlined className="text-[40px] text-[#3aadeb] my-7" />
        </div>
      )}
    </div>
  );
}
