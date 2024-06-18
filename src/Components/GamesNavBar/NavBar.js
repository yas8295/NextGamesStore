import React, { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import SideBarMenuIcon from "../SideBar/SmallScreenSideBar/SideBarMenuIcon";
import SmallScreenSideBar from "../SideBar/SmallScreenSideBar/SmallScreenSideBar";
import Navigation from "../SideBar/Navigation";
import { usePathname } from "next/navigation";
import WishlistBadge from "./WishlistBadge/WishlistBadge";
import CartBadge from "./CartBadge/CartBadge";
import UserBadge from "./UserBadge/UserBadge";

export default function NavBar() {
  const [open, toggleOpen] = useState(false);
  const pathName = usePathname();

  return (
    <div className="flex gap-2 justify-between items-center w-full h-fit md:px-4 pt-4">
      {pathName !== "/" && (
        <>
          <SideBarMenuIcon
            open={open}
            toggleOpen={toggleOpen}
          ></SideBarMenuIcon>
          <SmallScreenSideBar open={open}>
            <Navigation open={open} toggleOpen={toggleOpen}></Navigation>
          </SmallScreenSideBar>
        </>
      )}
      <SearchBar></SearchBar>
      <div className="flex justify-end items-center gap-3 px-2 grow">
        <WishlistBadge />
        <CartBadge />
        <UserBadge />
      </div>
    </div>
  );
}
