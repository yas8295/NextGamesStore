import GameCard from "@/Components/GameCard/GameCard";
import { useGetSimilarGames } from "@/hooks/AllGamesHooks/useGetSimilarGames";
import { LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SlideHeading from "../SlideHeading";

export default function Slide5({ game, screenShots }) {
  const { data, isLoading } = useGetSimilarGames(
    game?.name,
    game?.parent_platforms[0].platform.id,
    game?.tags[0]?.id || "singleplayer",
    game?.genres[0]?.id,
    game?.publishers[0]?.id
  );

  if (data?.results?.length === 0 || data?.results?.length === 1) {
    return;
  }

  return (
    <div className="h-fit min-h-screen w-full flex flex-col justify-between md:gap-4 gap-2 snap-start relative lg:p-3 p-2 font-orbitron">
      <SlideHeading title="games you may like" />
      <Image
        className="absolute top-0 left-0 w-full h-full z-[-1] object-cover brightness-75"
        src={
          screenShots?.results?.[4]?.image ||
          screenShots?.results?.[0]?.image ||
          game.background_image
        }
        alt={game.name}
        width={"100%"}
        height={"100%"}
        blurDataURL="media.rawg.io"
      ></Image>
      {!isLoading ? (
        <Swiper
          mousewheel={{ enabled: true, releaseOnEdges: true, sensitivity: 10 }}
          lazy="true"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            760: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          navigation={true}
          modules={[Navigation, Mousewheel]}
          centeredSlides={true}
          className={`flex items-center gap-3 w-full h-full flex-wrap grow`}
        >
          {data?.results?.map(
            (similarGame) =>
              (similarGame, similarGame.name !== game.name) && (
                <SwiperSlide key={similarGame?.id} className="w-full h-full">
                  <GameCard
                    id={similarGame?.id}
                    images={similarGame?.short_screenshots}
                    name={similarGame?.name}
                    rating={similarGame?.rating}
                    price={similarGame?.playtime + 230}
                    platforms={similarGame?.parent_platforms}
                    released={similarGame?.released}
                    genres={similarGame?.genres}
                    width="w-full"
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
