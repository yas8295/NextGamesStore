import React from "react";
import { Rate, Carousel, Tag, Skeleton } from "antd";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useGetGame } from "@/hooks/AllGamesHooks/useGetGame";
import { useRouter } from "next/router";
import Link from "next/link";
import WishListButton from "./WishListButton";
import CartButton from "./CartButtons/CartButton";
import PlatformsIcons from "./PlatformsIcons";

export default function GameCard({
  id,
  images,
  name,
  rating,
  price,
  platforms,
  released,
  genres,
  layOut = false,
  width = "",
}) {
  const { push } = useRouter();
  const { data } = useGetGame(id);

  const description = data?.description_raw;

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      layout
      className={`p-[1.5px] ${width} grow rounded-[0px_15px] border-[double_1px_transparent] ${
        layOut
          ? "md:w-[90%] w-full min-h-[450px] max-h-full"
          : "w-80 overflow-hidden"
      } bg-[linear-gradient(to_right,#0098FF,#7C34C8)] origin-center`}
      style={{
        backgroundOrigin: "border-box",
        backgroundClip: "border-box",
      }}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 200, damping: 60 }}
        className={`flex ${
          layOut ? "md:flex-row flex-col" : "flex-col"
        } rounded-[0px_15px] w-full h-full min-h-[450px!important] backdrop-blur-lg bg-black bg-gradient-to-r from-[#2eceff36] to-[#00000000]`}
      >
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
              layOut
                ? "md:bottom-3 md:left-3 bottom-[85%] left-2"
                : "top-2 left-2"
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
                  width={800}
                  height={800}
                  key={image.image}
                  src={image.image}
                  loading="lazy"
                  placeholder="blur"
                  alt={name}
                  blurDataURL="media.rawg.io"
                  className={`w-full object-top duration-500 transition-all hover:scale-110 hover:rotate-3 saturate-50 hover:saturate-200 ${
                    layOut
                      ? "md:h-[400px] h-[250px] object-cover"
                      : "md:h-80 h-[220px] object-cover select-none"
                  } rounded-[0px_15px]`}
                />
              ))
            ) : (
              <Skeleton.Image
                blurDataURL="media.rawg.io"
                className={`p-5 ${
                  layOut
                    ? "max-h-96 h-96 object-fill"
                    : "max-h-60 h-60 object-cover"
                }`}
              ></Skeleton.Image>
            )}
          </Carousel>
        </motion.div>
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 200, damping: 60 }}
          className={`flex flex-col justify-between gap-3 md:min-h-60 min-h-fit grow ${
            layOut ? "md:py-7 md:px-5 px-3 pb-3" : "py-5 px-3"
          }`}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 200, damping: 60 }}
            className="flex flex-col gap-2"
          >
            {layOut && (
              <>
                <Link
                  href={`/game/${id}`}
                  className="md:text-[23px] text-[19px] capitalize font-semibold cursor-pointer w-fit bg-white hover:bg-[linear-gradient(93.25deg,#0098FF_4.45%,#7C34C8_93.88%)] bg-clip-text font-orbitron self-center mb-2"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  {name}
                </Link>
                <div className="w-full h-[1px] bg-[linear-gradient(to_right,transparent,#818078,transparent)] mb-5"></div>
              </>
            )}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-[7px]">
                {platforms?.slice(0, 3).map((p) => (
                  <h1
                    className="md:text-[25px] text-[20px]"
                    key={p.platform.name}
                  >
                    <PlatformsIcons name={p.platform.name} />
                  </h1>
                ))}
              </div>
              <h1 className="font-orbitron text-[14px]">
                {new Date(released).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </h1>
            </div>
            {!layOut && (
              <Link
                href={`/game/${id}`}
                className="md:text-[23px] text-[19px] capitalize font-semibold cursor-pointer w-fit bg-white hover:bg-[linear-gradient(93.25deg,#0098FF_4.45%,#7C34C8_93.88%)] bg-clip-text font-orbitron"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                {name}
              </Link>
            )}
            <AnimatePresence mode="popLayout">
              {layOut && (
                <motion.h1
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  layout
                  transition={{ type: "spring", stiffness: 80 }}
                  className="md:block hidden my-3"
                >
                  {description ? (
                    `${description?.slice(0, 500)}.`
                  ) : (
                    <Skeleton
                      title={false}
                      className="mb-2 h-[50%]"
                      paragraph={{ rows: 4, width: "100%" }}
                      active
                    />
                  )}
                </motion.h1>
              )}
            </AnimatePresence>
            <div
              className={`flex items-center flex-wrap gap-1 ${
                layOut && "self-center"
              }`}
            >
              <h1 className="me-1 md:text-[17px] text-[15px]">Genres:</h1>
              {genres?.map((g) => (
                <Tag
                  onClick={() => {
                    push(`/genres/${g.id}`);
                  }}
                  key={g.name}
                  className="cursor-pointer text-[13px] opacity-100 duration-500 hover:opacity-80 select-none active:scale-90 bg-gradient-to-r from-[#0094d3] to-[#3f36b9] text-white border-0"
                >
                  {g.name}
                </Tag>
              ))}
            </div>
          </motion.div>
          <CartButton
            key={id}
            game={{
              id,
              image: images && images[0]?.image,
              name,
              price,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
