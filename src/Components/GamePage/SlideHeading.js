import React from "react";
import { motion } from "framer-motion";

export default function SlideHeading({ title }) {
  return (
    <div className="flex gap-1 w-fit flex-wrap relative before:absolute before:md:top-[5px] before:top-[1px] before:left-0 before:w-[40%] before:h-[4px] before:bg-gradient-to-r before:from-[#119cd7] before:to-[#6a29e8] after:absolute after:md:bottom-[1px] after:bottom-[-5px] after:right-0 after:w-[40%] after:h-[4px] after:bg-gradient-to-r after:from-[#6a29e8] after:to-[#119cd7]">
      {title.split("").map((c, i) => (
        <motion.span
          className={`${
            i === 0 && "uppercase"
          } md:text-[40px] text-[24px] font-extrabold`}
          initial={{ opacity: 0, x: "50px" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 40,
            delay: `${i >= 10 ? 1 : i >= 20 ? 2 : 0}.${
              Array.from(String(i), Number)[1] || i
            }`,
          }}
          key={i}
        >
          {c}
        </motion.span>
      ))}
    </div>
  );
}
