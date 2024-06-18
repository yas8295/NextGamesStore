import React from "react";
import { AppstoreOutlined, PicCenterOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { Segmented } from "antd";

export default function ViewButtons({ setLayOut }) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 200, damping: 40 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-center"
    >
      <Segmented
        defaultValue=""
        className="flex items-center text-white text-[17px] py-2 relative border-[2px] border-[#36709a] overflow-hidden z-10 bg-[#ffffff1d] backdrop-blur-sm rounded-lg shadow-md before:w-24 before:h-24 before:left-16 before:top-[-70px] before:absolute before:bg-[#e682f5af] before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-[#2ddcffb4]  after:rounded-full after:-z-10 after:blur-xl after:top-12 after:-right-5"
        size="large"
        options={[
          {
            label: "List",
            value: "column",
            icon: <PicCenterOutlined className="text-[20px]" />,
          },
          {
            label: "Grid",
            value: "",
            icon: <AppstoreOutlined className="text-[20px]" />,
          },
        ]}
        onChange={(value) => setLayOut(value)}
      />
    </motion.div>
  );
}
