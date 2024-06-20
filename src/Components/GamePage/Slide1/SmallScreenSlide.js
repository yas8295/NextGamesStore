import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SmallScreenSlide({
  game,
  screenShots,
  setSelectImage,
  selectImage,
}) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 30 }}
      className="absolute md:hidden flex flex-row bottom-0 left-0 w-full h-[14%] overflow-auto rounded-lg"
      style={{ scrollbarColor: `#999999 black`, scrollbarWidth: "thin" }}
    >
      {screenShots?.results?.slice(0, 5).map((image, i) => (
        <Image
          onClick={() => {
            setSelectImage((i) =>
              i === image.image ? game.background_image : image.image
            );
          }}
          key={image.id}
          className={`min-w-[150px] h-full cursor-pointer object-cover z-10 ${
            selectImage === image.image
              ? "brightness-[100%]"
              : "brightness-[70%]"
          } duration-500 border-[3px] border-color-[white]`}
          src={image.image || game.background_image}
          alt={game.name}
          width={400}
          height={400}
        ></Image>
      ))}
    </motion.div>
  );
}
