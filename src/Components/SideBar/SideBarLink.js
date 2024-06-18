import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function SideBarLink({ href, children, toggleOpen, open }) {
  const pathName = usePathname();

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 200, damping: 40 }}
    >
      <Link
        onClick={() => open && toggleOpen(false)}
        href={href}
        className={`group ${
          pathName === href && "font-bold"
        } text-[18px] flex items-center gap-3 capitalize hover:opacity-80 duration-300`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
