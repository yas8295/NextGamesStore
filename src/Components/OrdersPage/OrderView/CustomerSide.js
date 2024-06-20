import React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Avatar } from "antd";
import { CiMail } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { BsClipboard2Check } from "react-icons/bs";
import { IoArrowRedoSharp } from "react-icons/io5";
import Link from "next/link";

export default function CustomerSide({ order, ordersCount }) {
  const { data: session, status } = useSession();
  const username = session?.user.name.split(" ");

  const itemsCount = order.items.length;
  const tax = order.total * 1.03 - order.total;
  const total = order.total - tax;

  return (
    <motion.div
      initial={{ opacity: 0, x: "10%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="md:w-[38%] w-full grow md:mt-14 self-start flex flex-col gap-4 rounded-lg py-8 md:px-5 px-3 bg-[#afc3f7e4] backdrop-blur-sm text-black relative before:absolute before:z-[1] before:top-[0] before:left-0 before:w-[100%] before:h-[8px] before:bg-gradient-to-r before:from-[#119cd7] before:to-[#6a29e8] after:absolute after:bottom-[0px] after:right-0 after:w-[100%] after:h-[8px] after:bg-gradient-to-r after:from-[#6a29e8] after:to-[#119cd7]"
    >
      <h1 className="text-[22px] font-semibold">Customer</h1>
      <h1 className="capitalize flex items-center gap-2 font-semibold text-[19px]">
        <Avatar
          size={38}
          style={{
            background:
              "linear-gradient(90deg, rgba(0,170,255,1) 0%, rgba(81,49,255,1) 100%)",
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
          }}
          className="uppercase"
        >
          <h1 className="flex gap-[2px]">
            <span>{status !== "loading" && username?.[0][0]}</span>
            <span>{status !== "loading" && username?.[1][0]}</span>
          </h1>
        </Avatar>
        {status !== "loading" && `${username[0]} ${username[1]}`}
      </h1>
      <h1 className="capitalize flex justify-between items-center gap-2 font-semibold text-[19px] ms-2">
        <div className="flex items-center gap-2">
          <BsClipboard2Check className="text-[25px]" />
          <p>{ordersCount} Orders</p>
        </div>
        <Link href={"/orders"}>
          <IoArrowRedoSharp className="text-[25px]" />
        </Link>
      </h1>
      <div className="flex flex-col gap-2 mt-3">
        <h1 className="md:text-[20px] text-[17px] font-semibold mb-1">
          Contact info
        </h1>
        <h1 className="flex items-center gap-2">
          <CiMail className="text-[25px]" />
          <p className="md:text-[19px] text-[17px]">
            {order?.shippingDetails.email}
          </p>
        </h1>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <h1 className="md:text-[20px] text-[17px] font-semibold mb-1">
          Shipping address
        </h1>
        <h1 className="flex items-center gap-2">
          <IoHomeOutline className="text-[25px]" />
          <p className="md:text-[19px] text-[17px]">
            {order?.shippingDetails.address}
          </p>
        </h1>
        <h1 className="flex items-center gap-2">
          <IoLocationOutline className="text-[25px]" />
          <p className="md:text-[19px] text-[17px]">
            {order?.shippingDetails.city}
          </p>
        </h1>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <h1 className="md:text-[20px] text-[17px] font-semibold mb-1">
          Payment summary
        </h1>
        <div className="flex justify-between items-center gap-2">
          <p className="md:text-[19px] text-[17px]">
            <span className="font-semibold">Subtotal</span> ({itemsCount} items)
          </p>
          <p className="font-semibold">${total.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center font-semibold gap-2">
          <p className="md:text-[19px] text-[17px]">Tax</p>
          <p>${tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center font-semibold gap-2 mt-2">
          <p className="md:text-[22px] text-[20px]">Total price</p>
          <p className="text-[20px]">${(total + tax).toFixed(2)}</p>
        </div>
      </div>
    </motion.div>
  );
}
