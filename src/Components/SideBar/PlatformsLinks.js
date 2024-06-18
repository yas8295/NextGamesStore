import React, { useState } from "react";
import SideBarLink from "./SideBarLink";
import { PiWindowsLogoFill } from "react-icons/pi";
import { FaPlaystation } from "react-icons/fa";
import { FaXbox } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { FaApple } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";

export default function PlatformsLinks({ pathName, open, toggleOpen }) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <SideBarLink open={open} toggleOpen={toggleOpen} href="/platforms/4">
        <PiWindowsLogoFill
          className={`${
            pathName === "/platforms/4"
              ? "bg-[#ffffff] text-black"
              : "bg-[#303030]"
          } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
        />
        PC
      </SideBarLink>
      <SideBarLink open={open} toggleOpen={toggleOpen} href="/platforms/187">
        <FaPlaystation
          className={`${
            pathName === "/platforms/187"
              ? "bg-[#ffffff] text-black"
              : "bg-[#303030]"
          } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
        />
        PlayStation 5
      </SideBarLink>
      <SideBarLink open={open} toggleOpen={toggleOpen} href="/platforms/1">
        <FaXbox
          className={`${
            pathName === "/platforms/1"
              ? "bg-[#ffffff] text-black"
              : "bg-[#303030]"
          } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
        />
        Xbox one
      </SideBarLink>
      {show && (
        <>
          <SideBarLink open={open} toggleOpen={toggleOpen} href="/platforms/7">
            <BsNintendoSwitch
              className={`${
                pathName === "/platforms/7"
                  ? "bg-[#ffffff] text-black"
                  : "bg-[#303030]"
              } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
            />
            Nintendo Switch
          </SideBarLink>
          <SideBarLink open={open} toggleOpen={toggleOpen} href="/platforms/3">
            <FaApple
              className={`${
                pathName === "/platforms/3"
                  ? "bg-[#ffffff] text-black"
                  : "bg-[#303030]"
              } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
            />
            iOS
          </SideBarLink>
          <SideBarLink open={open} toggleOpen={toggleOpen} href="/platforms/21">
            <IoLogoAndroid
              className={`${
                pathName === "/platforms/21"
                  ? "bg-[#ffffff] text-black"
                  : "bg-[#303030]"
              } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
            />
            Android
          </SideBarLink>
        </>
      )}
      <motion.button
        layout
        transition={{ type: "spring", stiffness: 100 }}
        onClick={() => {
          setShow(!show);
        }}
        className="group flex items-center gap-3 text-[18px] opacity-70 hover:opacity-100"
      >
        <IoIosArrowDown
          className={`bg-[#303030] group-hover:bg-[#828282] group-hover:text-black  w-9 h-9 p-[7px] duration-300 rounded-md ${
            show && "rotate-180"
          }`}
        />
        {show ? "Hide" : "Show all"}
      </motion.button>
    </div>
  );
}
