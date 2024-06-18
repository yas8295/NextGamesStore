import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function NavBarLink({
  href,
  children,
  className = "",
  open,
  toggleOpen,
}) {
  return (
    <Link
      onClick={() => open && toggleOpen(false)}
      href={href}
      className="w-fit mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        className={`origin-left ${className}`}
        whileTap={{ scale: 0.9 }}
        transition={{
          duration: 0.12,
        }}
      >
        {children}
      </motion.div>
    </Link>
  );
}
