import { getMonth } from "@/helpers/helpers";
import React from "react";
import { Segmented } from "antd";
import { getMonth as thisMonth } from "date-fns";

export const monthName = (month) => {
  switch (month) {
    case 1:
      return "jan";
    case 2:
      return "feb";
    case 3:
      return "mar";
    case 4:
      return "apr";
    case 5:
      return "may";
    case 6:
      return "jun";
    case 7:
      return "jul";
    case 8:
      return "aug";
    case 9:
      return "sep";
    case 10:
      return "oct";
    case 11:
      return "nov";
    case 12:
      return "dec";
  }
};

export default function MonthsList({ month, setMonth, status }) {
  const value = month.split("-")[1].split(0)[1] || month.split("-")[1];
  return (
    <Segmented
      value={value - 1}
      className="text-white text-[17px] py-1 relative border-[2px] border-[#36709a] overflow-hidden z-10 bg-[#8c8c8c44] backdrop-blur-lg rounded-lg shadow-md before:w-24 before:h-24 before:left-16 before:top-[-70px] before:absolute before:bg-[#b77dc1af] before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-[#2ddcff] after:rounded-full after:-z-10 after:blur-xl after:top-12 after:-right-5 lg:overflow-x-hidden overflow-x-auto"
      options={Array.from({ length: 12 }, (e, i) => ({
        label:
          monthName(i + 1)
            ?.charAt(0)
            ?.toUpperCase() + monthName(i + 1)?.slice(1),
        value: i,
        disabled: status === "loading",
      }))}
      onChange={(value) => {
        setMonth(getMonth(value));
      }}
    />
  );
}
