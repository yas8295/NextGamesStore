import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { Pagination, Autoplay, Mousewheel, EffectCube } from "swiper/modules";
import { useGetMostPopularGames } from "@/hooks/AllGamesHooks/useGetMostPopularGames";
import Image from "next/image";
import PopularGameDetails from "./PopularGameDetails";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingOutlined } from "@ant-design/icons";
import { FaXmark } from "react-icons/fa6";

export default function MostPopularGamesThisYear() {
  const [show, setShow] = useState(true);
  const { data, isLoading, isError } = useGetMostPopularGames();

  if (!data && !isLoading) {
    return;
  }

  return (
    <AnimatePresence mode="popLayout">
      {show && (
        <motion.div
          exit={{ opacity: 0, y: -100 }}
          className="shadow-2xl w-full md:min-h-[450px] min-h-[70vh] md:mb-4 mb-2 md:rounded-b-3xl rounded-b-xl"
        >
          <Swiper
            effect={"cube"}
            grabCursor={true}
            cubeEffect={{
              shadow: false,
            }}
            mousewheel={{ enabled: true }}
            autoplay={{ pauseOnMouseEnter: true, delay: 5000 }}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay, Mousewheel, EffectCube]}
            className="w-full h-full"
          >
            {!isLoading && !isError ? (
              data?.results?.map((game) => (
                <SwiperSlide className="relative" key={game.id}>
                  <Image
                    priority
                    width={1200}
                    height={1200}
                    blurDataURL="media.rawg.io"
                    placeholder="blur"
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-full object-cover object-top brightness-[60%] md:rounded-b-3xl rounded-b-xl"
                  />
                  <PopularGameDetails game={game} />
                  <FaXmark
                    onClick={() => setShow(false)}
                    className="absolute right-3 top-3 cursor-pointer md:text-[23px] text-[18px]"
                  />
                  <div className="text-nowrap w-fit absolute left-3 top-3 font-semibold md:text-[50px] text-[27px]">
                    <div className="flex flex-wrap sm:gap-2 gap-[3px] relative before:absolute before:top-[10px] before:left-0 before:w-[50%] before:h-[4px] before:bg-gradient-to-r before:from-[#119cd7] before:to-[#6a29e8] after:absolute after:bottom-[-10px] after:right-0 after:w-[50%] after:h-[4px] after:bg-gradient-to-r after:from-[#6a29e8] after:to-[#119cd7]">
                      {"New and trending".split("").map((c, i) => (
                        <motion.span
                          className={`${i === 0 && "uppercase"} mb-[-10px]`}
                          initial={{ opacity: 0, x: "400px" }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 40,
                            delay: `${i >= 10 ? 1 : i >= 20 ? 2 : 0}.${
                              Array.from(String(i), Number)[1] || i
                            }`,
                          }}
                          key={i}
                        >
                          {c}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide className="w-full h-full flex justify-center items-center">
                <LoadingOutlined className="text-[40px] text-[#3aadeb]" />
              </SwiperSlide>
            )}
          </Swiper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
