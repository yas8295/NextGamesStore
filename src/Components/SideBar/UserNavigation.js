import React from "react";
import { Avatar } from "antd";
import { useSession } from "next-auth/react";
import { BsFillBagHeartFill } from "react-icons/bs";
import { TbShoppingCartFilled } from "react-icons/tb";
import SideBarLink from "./SideBarLink";
import { usePathname } from "next/navigation";
import { FaMoneyCheckDollar } from "react-icons/fa6";

export default function UserNavigation({ open, toggleOpen }) {
  const pathName = usePathname();

  const { data: session, status } = useSession();
  const username = session?.user.name.split(" ");

  return (
    session && (
      <>
        <div className="flex items-center gap-2">
          <h1 className="text-[22px] capitalize font-bold font-orbitron">
            {username?.[0][0]}.{username?.[1]}
          </h1>
          <Avatar
            size={45}
            style={{
              background:
                "linear-gradient(90deg, rgba(0,170,255,1) 0%, rgba(81,49,255,1) 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            className="uppercase"
          >
            <h1 className="flex gap-[2px]">
              <span>{status !== "loading" && username?.[0][0]}</span>
              <span>{status !== "loading" && username?.[1][0]}</span>
            </h1>
          </Avatar>
        </div>
        <div className="flex flex-col gap-3 mb-2">
          <SideBarLink open={open} toggleOpen={toggleOpen} href="/wishlist">
            <BsFillBagHeartFill
              className={`${
                pathName === "/wishlist"
                  ? "bg-[#ffffff] text-black"
                  : "bg-[#303030]"
              } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
            />
            Wishlist
          </SideBarLink>
          <SideBarLink open={open} toggleOpen={toggleOpen} href="/cart">
            <TbShoppingCartFilled
              className={`${
                pathName === "/cart"
                  ? "bg-[#ffffff] text-black"
                  : "bg-[#303030]"
              } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
            />
            Cart
          </SideBarLink>
          <SideBarLink open={open} toggleOpen={toggleOpen} href="/orders">
            <FaMoneyCheckDollar
              className={`${
                pathName === "/orders"
                  ? "bg-[#ffffff] text-black"
                  : "bg-[#303030]"
              } w-9 h-9 p-[7px] duration-300 rounded-md group-hover:bg-white group-hover:text-black`}
            />
            Orders
          </SideBarLink>
        </div>
      </>
    )
  );
}
