import Image from "next/image";
import React from "react";

export default function EmptyWishlist() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 mt-5">
      <Image
      priority
        width={600}
        height={600}
        src="/wishlist.png"
        alt="image"
        className="object-cover"
      ></Image>
      <h1 className="uppercase w-auto h-auto text-center md:text-[35px] text-[20px] font-semibold font-orbitron italic">
        no games in your wishlist
      </h1>
    </div>
  );
}
