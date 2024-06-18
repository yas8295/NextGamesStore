import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import LoadingTitle from "./LoadingTitle";

export default function HeaderTitle({ status, titleOfCategory, month }) {
  const router = useRouter();

  const thisMonth = new Date(
    2024,
    month?.split("-")[1] - 1,
    1
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  let year = `${new Date(month?.split("-")[0], 1, 1).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
    }
  )} - ${new Date(month?.split(",")[1].split("-")[0], 1, 1).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
    }
  )}`;

  const oneYear =
    year.split("-")[0].trim() === year.split("-")[1].trim()
      ? year.split("-")[0]
      : undefined;

  return (
    <h1 className="grow flex items-center flex-wrap gap-3 sm:text-[60px] text-[25px] font-extrabold font-orbitron">
      <div className="text-nowrap w-fit relative before:absolute before:md:top-[10px] before:top-[1px] before:left-0 before:w-[40%] before:h-[4px] before:bg-gradient-to-r before:from-[#119cd7] before:to-[#6a29e8] after:absolute after:md:bottom-[0px] after:bottom-[-12px] after:right-0 after:w-[40%] after:h-[4px] after:bg-gradient-to-r after:from-[#6a29e8] after:to-[#119cd7] md:mt-3 mt-1 mb-3">
        <div className="flex flex-wrap sm:gap-2 gap-[3px]">
          {titleOfCategory.split(" ")[2] !== "undefined" ? (
            titleOfCategory.split("").map((c, i) => (
              <motion.span
                className={`${i === 0 && "uppercase"} mb-[-10px]`}
                initial={{ opacity: 0, x: "400px" }}
                animate={{ opacity: 1, x: 0 }}
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
            ))
          ) : (
            <LoadingTitle />
          )}
        </div>
      </div>
      {month && router.pathname === "/releasecalendargames" ? (
        <>
          -{" "}
          <div className="flex sm:gap-1 gap-[2px]">
            {status !== "loading" ? (
              thisMonth.split("").map((c, i) => (
                <motion.span
                  initial={{ opacity: 0, x: "400px" }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 40,
                    delay: `0.${i}`,
                  }}
                  key={i}
                >
                  {c}
                </motion.span>
              ))
            ) : (
              <LoadingTitle />
            )}
          </div>
        </>
      ) : (
        month && (
          <>
            -{" "}
            <div className="flex sm:gap-1 gap-[2px]">
              {status !== "loading" ? (
                (oneYear || year).split("").map((c, i) => (
                  <motion.span
                    initial={{ opacity: 0, x: "400px" }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 40,
                      delay: `0.${i}`,
                    }}
                    key={i}
                  >
                    {c}
                  </motion.span>
                ))
              ) : (
                <LoadingTitle />
              )}
            </div>
          </>
        )
      )}
    </h1>
  );
}
