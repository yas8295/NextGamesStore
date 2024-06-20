import { useGetGameScreenShots } from "@/hooks/AllGamesHooks/useGetGameScreenShots";
import React, { useEffect, useRef } from "react";
import Slides from "./Slides";
import { usePathname } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";

export default function GamePage({ game }) {
  const { data, isLoading } = useGetGameScreenShots(game.id);
  const scrollRef = useRef(null);
  const pathName = usePathname();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathName]);

  useEffect(() => {
    document.querySelector(
      ".side-bar"
    ).style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)) , url(${game.background_image})`;

    document.querySelector(".side-bar").style.border = `none`;

    return () => {
      if (document.querySelector(".side-bar")) {
        document.querySelector(".side-bar").style.background = ``;
        document.querySelector(".side-bar").style.border = ``;
      }
    };
  }, [game]);

  return (
    <div
      ref={scrollRef}
      className="h-screen w-full snap-y snap-mandatory overflow-y-auto overflow-x-hidden"
    >
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingOutlined className="text-[40px] text-[#3aadeb] my-7" />
        </div>
      ) : (
        <Slides game={game} screenShots={data}></Slides>
      )}
    </div>
  );
}
