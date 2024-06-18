import { useGetGame } from "@/hooks/AllGamesHooks/useGetGame";
import Image from "next/image";
import React from "react";

export default function ConfirmedOrderItem({
  id,
  quantity,
  amount,
  border = true,
}) {
  const { data } = useGetGame(id);

  return (
    <div className="font-orbitron grid grid-cols-4 sm:px-4 px-3 md:py-3 py-2 items-center">
      <div className="col-span-2">
        <div className="flex items-center gap-3">
          <Image
            src={data?.background_image}
            alt={data?.name}
            width={150}
            height={150}
            className={`rounded-lg object-cover min-w-16 w-16 h-16 drop-shadow-[-13px_6px_8px_rgba(0,0,0,0.50)]`}
          />
          <h1 className="md:text-[14px] text-[12px]">{data?.name}</h1>
        </div>
      </div>
      <h1 className="text-right md:text-[14px] text-[12px]">{quantity}</h1>
      <h1 className="text-right font-semibold md:text-[14px] text-[12px]">
        ${amount.toFixed(1)}
      </h1>
      {border && <hr className="col-span-4 mt-4 opacity-30" />}
    </div>
  );
}
