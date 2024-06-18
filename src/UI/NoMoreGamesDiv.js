import React from "react";

export default function NoMoreGamesDiv() {
  return (
    <button
      disabled
      className="capitalize font-orbitron group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 relative h-16 w-64 text-left p-3 text-gray-50 text-base font-bold rounded-lg  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-[#1d9db4] after:right-8 after:top-3 after:rounded-full after:blur-lg cursor-default"
    >
      No more games
    </button>
  );
}
