import Link from "next/link";
import React from "react";

export default function Custom404() {
  return (
    <div className="flex h-full items-center justify-center grow bg-fixed bg-cover bg-bottom error-bg">
      <div className="offset-sm-2 text-gray-50 text-center">
        <div className="relative">
          <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
          <span className="absolute top-0 -ml-12 text-gray-300 font-semibold">
            Oops!
          </span>
        </div>
        <h5 className="text-gray-300 font-semibold -mr-10 -mt-3">
          Page not found
        </h5>
        <p className="text-gray-100 mt-2 mb-6">
          we are sorry, but the page you requested was not found
        </p>
        <Link
          href={"/"}
          className="bg-gradient-to-r w-44 from-[#0070d3] to-[#8f36b9] hover:from-purple-600 hover:to-[#155687] text-white font-semibold py-3 px-6 rounded-tr-xl rounded-bl-xl shadow-lg transform transition duration-500 ease-in-out capitalize font-orbitron"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
