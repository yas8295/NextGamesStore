import { useRouter } from "next/router";
import React from "react";

export default function ErrorComponent() {
  const { reload } = useRouter();

  return (
    <div className="flex flex-col h-full w-full justify-center items-center gap-6">
      <h1 className="md:text-[25px] text-[20px] text-center">
        ⛔ Something went wrong check your network...!
      </h1>
      <button
        className="bg-gradient-to-r md:w-44 w-36 from-[#0070d3] to-[#8f36b9] hover:from-purple-600 hover:to-[#155687] text-white font-semibold py-3 px-6 rounded-tr-xl rounded-bl-xl shadow-lg transform transition duration-500 ease-in-out capitalize font-orbitron md:text-[18px] text-[16px]"
        onClick={reload}
      >
        Reload
      </button>
    </div>
  );
}
