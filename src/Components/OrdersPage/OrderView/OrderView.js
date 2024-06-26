import ConfirmedOrderReview from "@/Components/Checkout/ConfirmedOrderReview/ConfirmedOrderReview";
import { Tag } from "antd";
import { format, isPast, isToday } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import CustomerSide from "./CustomerSide";
import { CiDeliveryTruck } from "react-icons/ci";
import CancelOrderButton from "./CancelOrderButton";
import { useMutateOrder } from "@/hooks/MongoDB/order/useMutateOrder";
import { LoadingOutlined } from "@ant-design/icons";

export default function OrderView({ order, ordersCount }) {
  const [status, setStatus] = useState(order?.status);
  const { mutate, isLoading } = useMutateOrder(undefined, undefined, setStatus);

  useEffect(() => {
    if (
      (order?.status === "pending" && isPast(new Date(order?.deliveryDate))) ||
      (order?.status === "pending" && isToday(new Date(order?.deliveryDate)))
    ) {
      mutate({ order: order, method: "PUT" });
    }
  }, []);

  if (isLoading || !order) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingOutlined className="text-[40px] text-[#3aadeb] my-7" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Link
          className="opacity-70 hover:opacity-100 duration-200"
          href={"/orders"}
        >
          Orders
        </Link>
        /<h1>{order?.reference}</h1>
      </div>
      <h1 className="md:text-[25px] text-[22px]">
        <span className="opacity-80">Order</span> #{order?.reference}
      </h1>
      <div className="mt-6 flex items-center md:gap-2 gap-1">
        <Tag
          color="#16cf9d"
          className="md:text-[19px] text-[16px] text-[#e7fbec] font-semibold p-2 md:px-7 px-4"
        >
          Paid
        </Tag>
        <h1>|</h1>
        <h1 className="ms-3 flex md:text-[22px] text-[16px] items-center gap-2">
          <SlCalender className="md:text-[25px] text-[22px]" />
          Order date: {format(new Date(order?.date), "dd MMM, yy")}
        </h1>
      </div>
      <div className="flex md:flex-row flex-col gap-5">
        <div className="w-full flex flex-col gap-5">
          <ConfirmedOrderReview order={order} show={false} />
          <div className="flex justify-between gap-2 items-center flex-wrap">
            <div className="flex items-center gap-2">
              <Tag
                color={`${status === "pending" ? "#efe40f" : "#1db543"}`}
                className="md:text-[19px] text-[16px] text-[black!important] font-semibold p-2 md:px-7 px-4"
              >
                {status === "pending" ? "Pending" : "Delivered"}
              </Tag>
              <h1>|</h1>
              <h1 className="ms-3 flex md:text-[22px] text-[16px] items-center gap-2">
                <CiDeliveryTruck className="md:text-[28px] text-[25px]" />
                {status === "pending" ? "Delivery date" : "Delivered on"} :{" "}
                {format(new Date(order?.deliveryDate), "dd MMM, yy")}
              </h1>
            </div>
            {status === "pending" && <CancelOrderButton order={order} />}
          </div>
        </div>
        <CustomerSide order={order} ordersCount={ordersCount} />
      </div>
    </div>
  );
}
