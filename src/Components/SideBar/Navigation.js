import React from "react";
import { FaStar } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { IoPlayForward } from "react-icons/io5";
import SideBarLink from "./SideBarLink";
import { BsCalendarMonthFill } from "react-icons/bs";
import { GrAchievement } from "react-icons/gr";
import { IoMdStats } from "react-icons/io";
import { FaRankingStar } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getYear } from "date-fns";
import PlatformsLinks from "./PlatformsLinks";
import GenresLinks from "./GenresLinks";
import UserNavigation from "./UserNavigation";

export default function Navigation({ open, toggleOpen }) {
  const pathName = usePathname();

  return (
    <>
      <div className="flex flex-col gap-3 md:mt-5 mt-14 z-[1]">
        <Link
          onClick={() => open && toggleOpen(false)}
          href="/home"
          className="text-[22px] font-orbitron font-semibold hover:opacity-50 duration-300"
        >
          Home
        </Link>
        <UserNavigation open={open} toggleOpen={toggleOpen} />
        <h1 className="text-[22px] font-orbitron font-semibold">
          New Releases
        </h1>
        <div className="flex flex-col gap-3">
          <SideBarLink
            open={open}
            toggleOpen={toggleOpen}
            href="/last30daysgames"
          >
            <FaStar
              className={`${
                pathName === "/last30daysgames"
                  ? "bg-[#ffffff] text-black"
                  : "bg-[#303030]"
              } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
            />
            Last 30 days
          </SideBarLink>
          <SideBarLink
            open={open}
            toggleOpen={toggleOpen}
            href="/thisweekgames"
          >
            <BsFire
              className={`${
                pathName === "/thisweekgames"
                  ? "bg-[#ffffff] text-black"
                  : "bg-[#303030]"
              } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
            />
            This week
          </SideBarLink>
          <SideBarLink
            open={open}
            toggleOpen={toggleOpen}
            href="/nextweekgames"
          >
            <IoPlayForward
              className={`${
                pathName === "/nextweekgames"
                  ? "bg-[#ffffff] text-black"
                  : "bg-[#303030]"
              } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
            />
            Next week
          </SideBarLink>
          <SideBarLink
            open={open}
            toggleOpen={toggleOpen}
            href="/releasecalendargames"
          >
            <BsCalendarMonthFill
              className={`${
                pathName === "/releasecalendargames"
                  ? "bg-[#ffffff] text-black"
                  : "bg-[#303030]"
              } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
            />
            release calendar
          </SideBarLink>
          <h1 className="text-[22px] font-orbitron font-semibold mt-2">Top </h1>
          <div className="flex flex-col gap-3">
            <SideBarLink
              open={open}
              toggleOpen={toggleOpen}
              href="/bestoftheyear"
            >
              <GrAchievement
                className={`${
                  pathName === "/bestoftheyear"
                    ? "bg-[#ffffff] text-black"
                    : "bg-[#303030]"
                } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
              />
              Best of the year
            </SideBarLink>
            <SideBarLink
              open={open}
              toggleOpen={toggleOpen}
              href="/popularinlastyear"
            >
              <IoMdStats
                className={`${
                  pathName === "/popularinlastyear"
                    ? "bg-[#ffffff] text-black"
                    : "bg-[#303030]"
                } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
              />
              popular in {getYear(new Date()) - 1}
            </SideBarLink>
            <SideBarLink open={open} toggleOpen={toggleOpen} href="/alltimetop">
              <FaRankingStar
                className={`${
                  pathName === "/alltimetop"
                    ? "bg-[#ffffff] text-black"
                    : "bg-[#303030]"
                } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
              />
              all time top 250
            </SideBarLink>
            <Link
              onClick={() => open && toggleOpen(false)}
              href="/platforms"
              className="text-[22px] font-orbitron font-semibold hover:opacity-50 duration-300 mt-2"
            >
              Platforms
            </Link>
            <PlatformsLinks
              open={open}
              toggleOpen={toggleOpen}
              pathName={pathName}
            ></PlatformsLinks>
            <Link
              onClick={() => open && toggleOpen(false)}
              href="/genres"
              className="text-[22px] font-orbitron font-semibold hover:opacity-50 duration-300 mt-2"
            >
              Genres
            </Link>
            <GenresLinks
              open={open}
              toggleOpen={toggleOpen}
              pathName={pathName}
            ></GenresLinks>
          </div>
        </div>
      </div>
    </>
  );
}
