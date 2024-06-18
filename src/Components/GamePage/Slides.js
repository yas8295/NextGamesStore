import React, { useEffect, useState } from "react";
import Slide1 from "./Slide1/Slide1";
import Slide2 from "./Slide2/Slide2";
import Slide3 from "./Slide3/Slide3";
import Slide4 from "./Slide4/Slide4";
import Slide5 from "./Slide5/Slide5";

export default function Slides({ game, screenShots }) {
  const [selectImage, setSelectImage] = useState(game.background_image);

  useEffect(() => {
    setSelectImage(game.background_image);
  }, [game]);

  return (
    <>
      <Slide1
        selectImage={selectImage}
        setSelectImage={setSelectImage}
        game={game}
        screenShots={screenShots}
      />
      <Slide2 game={game} screenShots={screenShots} />
      <Slide3 game={game} screenShots={screenShots} />
      <Slide4 game={game} screenShots={screenShots} />
      <Slide5 game={game} screenShots={screenShots} />
    </>
  );
}
