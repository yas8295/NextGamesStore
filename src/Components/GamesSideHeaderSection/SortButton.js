import { Select } from "antd";
import React from "react";
import { PiSortAscendingLight } from "react-icons/pi";
import { motion } from "framer-motion";

export default function SortButton({
  order,
  setOrder,
  sort,
  setSort,
  setOpen = () => {},
}) {
  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        layout
        transition={{ type: "spring", stiffness: 200, damping: 40 }}
      >
        <Select
          defaultValue=""
          value={order ? `Order by: ${order}` : ""}
          allowClear
          className="w-[200px!important] overflow-hidden before:w-24 before:h-24 before:left-16 before:top-[-70px] before:absolute before:bg-[#b77dc1af] before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-[#2ddcff]  after:rounded-full after:-z-10 after:blur-xl after:top-12 after:-right-5 bg-[#8c8c8c44!important] backdrop-blur-sm border-[2px] border-[#36709a] rounded-lg"
          placeholder="Order by"
          size="large"
          style={{ width: 120 }}
          onChange={(value) => {
            setOrder(value);
            setOpen(false);
          }}
          onClear={() => {
            setOrder("");
          }}
          options={[
            { value: "name", label: "Name" },
            { value: "released", label: "Released" },
            { value: "", label: "Popularity" },
            { value: "rating", label: "Average rating" },
          ]}
        />
      </motion.div>
      {order && (
        <PiSortAscendingLight
          onClick={() => {
            setSort((sort) => (sort === "-" ? "" : "-"));
          }}
          className={`text-[25px] duration-500 cursor-pointer ms-[-5px] origin-center ${
            sort === "-" ? "rotate-0" : "rotate-180"
          }`}
        />
      )}
    </>
  );
}
