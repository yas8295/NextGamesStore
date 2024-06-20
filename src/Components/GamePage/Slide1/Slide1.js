import React from "react";
import Image from "next/image";
import WideScreenSlide from "./WideScreenSlide";
import SmallScreenSlide from "./SmallScreenSlide";
import GameDetails from "./GameDetails";

export default function Slide1({
  game,
  screenShots,
  selectImage,
  setSelectImage,
}) {
  return (
    <div className="h-full w-full snap-start relative lg:p-8 p-3">
      <Image
        priority
        className="absolute top-0 left-0 w-full h-full blur-[3px] opacity-80 z-[-1] object-cover"
        src={selectImage || game.background_image}
        alt={game.name}
        blurDataURL="media.rawg.io"
      ></Image>
      <div className="w-full h-full md:rounded-l-3xl md:rounded-r-none rounded-t-3xl bg-[#ffffff4c] backdrop-blur-xl border">
        <div className="h-full w-full relative md:rounded-l-3xl rounded-t-3xl">
          <GameDetails game={game} />
          <WideScreenSlide
            game={game}
            screenShots={screenShots}
            selectImage={selectImage}
            setSelectImage={setSelectImage}
          />
          <SmallScreenSlide
            game={game}
            screenShots={screenShots}
            selectImage={selectImage}
            setSelectImage={setSelectImage}
          />
          <Image
            className="absolute top-0 left-0 w-full h-full md:rounded-l-3xl rounded-t-3xl z-[-1] object-cover brightness-[65%]"
            src={selectImage || game.background_image}
            alt={game.name}
            width={700}
            height={700}
            blurDataURL="media.rawg.io"
          ></Image>
        </div>
      </div>
    </div>
  );
}
