import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Navigation from "./Navigation";

export default function SideBar() {
  const pathName = usePathname();

  return (
    pathName !== "/" && (
      <>
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 200, damping: 40 }}
          className={`side-bar border-r-[1px] border-[#0296fe] md:w-[20%] w-screen overflow-x-hidden overflow-y-auto p-5 lg:flex flex-col hidden gap-3`}
        >
          <Navigation></Navigation>
        </motion.div>
      </>
    )
  );
}
