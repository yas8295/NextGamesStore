import React from "react";

export default function SideBarMenuIcon({ open, toggleOpen }) {
  return (
    <label
      className={`hamburger ${
        open && "fixed top-[18px] z-[99999999999]"
      } ms-2 lg:hidden bg-white p-[6px] rounded-full cursor-pointer`}
    >
      <input
        onChange={() => toggleOpen(!open)}
        className="hidden peer"
        type="checkbox"
        checked={open}
      />
      <svg
        className="h-[25px] w-[25px] transition-[transform 600ms_cubic-bezier(0.4,0,0.2,1)] peer-checked:rotate-[-45deg] duration-500"
        viewBox="0 0 32 32"
      >
        <path
          className="line fill-none stroke-black line-top-bottom"
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
        />
        <path className="line fill-none stroke-black" d="M7 16 27 16" />
      </svg>
    </label>
  );
}
