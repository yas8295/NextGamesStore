import React, { useState } from "react";
import SmallScreenFilterButton from "@/UI/SmallScreenFilterButton";
import { Drawer } from "antd";
import FilterByTag from "../FilterByTag";
import PlatformsFilterButton from "../PlatformsFilterButton";
import ReleaseDateButton from "../ReleaseDateButton";

export default function FilterOptions({
  tags,
  setTags,
  setParentPaltforms,
  setPaltforms,
  month,
  setMonth,
}) {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SmallScreenFilterButton
        onClick={showDrawer}
        open={open}
      ></SmallScreenFilterButton>
      <Drawer
        className="text-white bg-[linear-gradient(50deg,rgb(11,0,97),hsl(253deg,85%,10%)48%,hsl(264deg,89%,6%)60%,hsl(0deg,0%,0%)100%)!important]"
        title="Filter"
        placement="bottom"
        closable={true}
        onClose={onClose}
        open={open}
        styles={{
          body: { padding: "15px", overflowX: "hidden" },
          header: { padding: "15px 10px" },
          content: { overflowX: "hidden" },
        }}
      >
        <div className="flex flex-col gap-6">
          <PlatformsFilterButton
            setParentPaltforms={setParentPaltforms}
            setPaltforms={setPaltforms}
            setOpen={setOpen}
          ></PlatformsFilterButton>
          <ReleaseDateButton
            month={month}
            setMonth={setMonth}
            setOpen={setOpen}
          ></ReleaseDateButton>
          <FilterByTag tags={tags} setTags={setTags}></FilterByTag>
        </div>
      </Drawer>
    </>
  );
}
