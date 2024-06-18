import SideBar from "../SideBar/SideBar";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import NavBar from "../GamesNavBar/NavBar";
import MostPopularGamesThisYear from "../MostPopularGamesThisYear/MostPopularGamesThisYear";

export default function Layout({ children, className }) {
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

  return (
    <div
      className={`${className} max-w-screen max-h-screen overflow-hidden flex`}
    >
      <SideBar></SideBar>
      <div
        ref={scrollRef}
        className={`relative flex min-w-[75%] w-[75%] ${
          pathName !== "/" && "overflow-auto"
        } grow flex-col overflow-x-hidden min-h-screen`}
      >
        {pathName === "/home" && <MostPopularGamesThisYear />}
        {!pathName?.startsWith("/game/") && pathName !== "/" && (
          <NavBar></NavBar>
        )}
        <div
          className={`${
            !pathName?.startsWith("/game/") &&
            pathName !== "/" &&
            "grow md:pt-3 pt-5 pb-10 md:px-5 px-2"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
