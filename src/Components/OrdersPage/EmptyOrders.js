import Image from "next/image";
import React from "react";

export default function EmptyOrders() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 mt-10">
      <Image
        priority
        width={600}
        height={600}
        src="/Order_empty.png"
        alt="image"
        className="object-cover md:w-[300px] w-[170px]"
      ></Image>
      <h1 className="uppercase w-auto h-auto text-center md:text-[35px] text-[20px] font-semibold font-orbitron italic">
        no orders yet
      </h1>
    </div>
  );
}
