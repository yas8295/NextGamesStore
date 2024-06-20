import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Rate, Carousel, Skeleton } from "antd";
import WishListButton from "../WishListButton";

export default function GameCardImages({ layOut, images, id, name, rating }) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 200, damping: 60 }}
      className={`relative ${
        layOut && "lg:w-[35%] md:w-[45%] max-w-full md:ms-5 md:mb-0 mb-2"
      } md:grow rounded-bl-xl`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 200, damping: 60 }}
        className={`absolute z-30 bg-[#37373778] shadow-2xl rounded-3xl p-2 text-center ${
          layOut
            ? "md:bottom-3 md:right-6 bottom-[83%] right-2"
            : "top-2 right-2"
        }`}
      >
        <WishListButton
          key={id}
          game={{
            id,
            image: images && images[0]?.image,
            name,
          }}
        />
      </motion.div>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 200, damping: 60 }}
        className={`absolute z-30 ${
          layOut ? "md:bottom-3 md:left-3 bottom-[85%] left-2" : "top-2 left-2"
        }`}
      >
        <Rate
          disabled
          className={`md:text-[18px] text-[14px] bg-[#37373778] shadow-2xl rounded-3xl p-2`}
          defaultValue={rating}
        ></Rate>
      </motion.div>
      {!layOut && (
        <div
          className={`absolute right-0 bottom-0 w-[100%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,1))] h-[20%] z-10`}
        ></div>
      )}
      <Carousel
        dotPosition={"bottom"}
        fade={true}
        draggable={true}
        lazyLoad="anticipated"
        touchMove={true}
        infinite={true}
        className={`grow duration-500 ${
          layOut && "md:translate-y-[-30px] border-[6px] rounded-[0px_15px]"
        }`}
      >
        {images?.length !== 0 ? (
          images?.map((image) => (
            <Image
              key={image.image}
              src={image.image}
              width={"100%"}
              height={"100%"}
              unoptimized={false}
              blurDataURL="media.rawg.io"
              alt={name}
              className={`w-full object-top duration-500 transition-all hover:scale-110 hover:rotate-3 saturate-50 hover:saturate-200 ${
                layOut
                  ? "md:h-[400px] h-[250px] object-cover"
                  : "md:h-80 h-[220px] object-cover select-none"
              } rounded-[0px_15px]`}
            />
          ))
        ) : (
          <Skeleton.Image
            className={`p-5 ${
              layOut
                ? "max-h-96 h-96 object-fill"
                : "max-h-60 h-60 object-cover"
            }`}
          ></Skeleton.Image>
        )}
      </Carousel>
    </motion.div>
  );
}
