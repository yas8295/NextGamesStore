import React from "react";
import { CiFilter } from "react-icons/ci";

export default function SmallScreenFilterButton({ onClick, open }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center justify-start w-9 h-9 bg-white text-black rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-3xl hover:w-28 hover:rounded-lg active:translate-x-1 active:translate-y-1 ${
        open && "hidden"
      }`}
    >
      <div className="flex fill-black text-[21px] items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
        <CiFilter className="font-bold" />
      </div>
      <div className="absolute right-5 transform translate-x-full opacity-0 text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Filter
      </div>
    </button>
  );
}
