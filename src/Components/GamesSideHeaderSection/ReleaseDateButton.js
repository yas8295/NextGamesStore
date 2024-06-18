import React from "react";
import { Cascader } from "antd";
import { useRouter } from "next/router";
import { years } from "@/helpers/releaseDateHelper";

export default function ReleaseDateButton({
  month,
  setMonth,
  setOpen = () => {},
}) {
  const router = useRouter();

  if (
    router.pathname !== "/platforms/[platform]" &&
    router.pathname !== "/home"
  ) {
    return null;
  }

  return (
    <Cascader
      className="w-[200px!important] self-start overflow-hidden before:w-24 before:h-24 before:left-16 before:top-[-70px] before:absolute before:bg-[#b77dc1af] before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-[#2ddcff] after:rounded-full after:-z-10 after:blur-xl after:top-12 after:-right-5 bg-[#8c8c8c44!important] backdrop-blur-sm border-[2px] border-[#36709a] rounded-lg"
      size="large"
      placeholder="Release date"
      value={month ? `Release date${month ? `: ${month}` : ""}` : ""}
      expandTrigger="hover"
      options={years.map((year) => ({
        value: year.value,
        label: year.label,
        children: year.children.map((c) => ({
          value: c.value,
          label: c.label,
        })),
      }))}
      onChange={(value) => {
        value && setMonth(value[1] ? value[1] : value[0]);
        setOpen(false);
      }}
      onClear={() => {
        setMonth(null);
      }}
      changeOnSelect
    />
  );
}
