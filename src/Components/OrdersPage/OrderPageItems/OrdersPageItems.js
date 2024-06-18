import { format } from "date-fns";
import React from "react";
import OrderItemsField from "./OrderItemsField";
import { Tooltip } from "antd";
import { TbEyeSearch } from "react-icons/tb";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LoadingOutlined } from "@ant-design/icons";

export default function OrdersPageItems({
  items,
  quantity,
  total,
  date,
  reference,
  border,
}) {
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="font-orbitron grid grid-cols-6 gap-2 sm:px-4 px-3 md:py-3 py-2 items-center">
        <div className="flex flex-col gap-3 col-span-2">
          {items.map((item) => (
            <OrderItemsField key={item.gameId} id={item.gameId} />
          ))}
        </div>
        <h1 className="text-right md:text-[14px] text-[11px]">{quantity}</h1>
        <h1 className="text-right md:text-[14px] text-[11px]">
          {format(new Date(date), "dd MMM yy")}
        </h1>
        <h1 className="text-right md:text-[14px] text-[11px]">
          ${total.toFixed(0)}
        </h1>
        <Tooltip title="View order">
          {status === "loading" ? (
            <LoadingOutlined className="w-fit mx-auto md:text-[23px] text-[19px]" />
          ) : (
            <Link
              className="w-fit mx-auto md:text-[23px] text-[19px] cursor-pointer hover:opacity-85"
              href={`orders/${session?.user.email}/${reference}`}
            >
              <TbEyeSearch />
            </Link>
          )}
        </Tooltip>
      </div>
      {border && <hr className="mt-2 opacity-30" />}
    </div>
  );
}
