import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SmallScreenSideBar({ children, open }) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 200, damping: 40 }}
          className={`side-bar fixed top-0 left-0 z-[999999] min-w-[100vw] max-w-[100vw] p-5 overflow-x-hidden overflow-y-auto flex flex-col lg:hidden max-h-screen gap-3`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
