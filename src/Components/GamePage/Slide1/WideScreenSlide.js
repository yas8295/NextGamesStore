import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WideScreenSlide({
  game,
  screenShots,
  setSelectImage,
  selectImage,
}) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 30, delay: 0.5 }}
      className="absolute md:flex hidden flex-col right-0 top-0 w-[30%] h-full"
    >
      {screenShots?.results?.slice(0, 5).map((image, i) => (
        <Image
          onClick={() => {
            setSelectImage((i) =>
              i === image.image ? game.background_image : image.image
            );
          }}
          key={image.id}
          className={`w-full h-[20%] grow cursor-pointer object-cover z-10 ${
            selectImage === image.image
              ? "brightness-[100%]"
              : "brightness-[60%]"
          } hover:brightness-[100%] duration-500`}
          src={image.image || game.background_image}
          alt={game.name}
          width={"100%"}
          height={"100%"}
          blurDataURL="media.rawg.io"
          style={{
            clipPath: `polygon(${
              i === 0 ? "10%" : "35%"
            } 0, 100% 0, 100% 100%, ${
              i === screenShots?.results?.slice(0, 5).length - 1 ? "10%" : "35%"
            } 100%)`,
          }}
        ></Image>
      ))}
    </motion.div>
  );
}
