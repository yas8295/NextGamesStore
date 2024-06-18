import React from "react";
import { BiSolidPurchaseTag } from "react-icons/bi";

export default function CheckoutFormButton({
  children,
  dir = "right",
  onClick = () => {},
  step = 0,
  disabled = false,
}) {
  return (
    <button
      disabled={disabled}
      type="submit"
      onClick={onClick}
      className="md:min-w-32 text-[15px] uppercase self-end disabled:cursor-not-allowed disabled:opacity-70"
    >
      <div className="relative items-center justify-start py-3 pl-3 pr-3 overflow-hidden font-semibold shadow transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-2 bg-gray-700 hover:text-gray-200 group">
        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[#2347c0] group-hover:h-full" />
        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
          {step === 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              className={`w-5 h-5 mt-[3px] ${
                dir === "back" && "rotate-180"
              } text-[#48a4ff]`}
            >
              <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <BiSolidPurchaseTag
              className={`w-5 h-5 mt-[3px] ${
                dir === "back" && "rotate-180"
              } text-[#48a4ff]`}
            />
          )}
        </span>
        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
          {step === 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              className={`w-5 h-5 mt-[3px] ${
                dir === "back" && "rotate-180"
              } text-[#48a4ff]`}
            >
              <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <BiSolidPurchaseTag
              className={`w-5 h-5 mt-[3px] ${
                dir === "back" && "rotate-180"
              } text-[#48a4ff]`}
            />
          )}
        </span>

        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200 me-7">
          {children}
        </span>
      </div>
    </button>
  );
}
