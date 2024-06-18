import React, { useState } from "react";
import { Drawer } from "antd";
import SortButton from "../SortButton";
import SmallScreenSortButton from "@/UI/SmallScreenSortButton";

export default function SortOptions({ order, setOrder, sort, setSort }) {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SmallScreenSortButton
        onClick={showDrawer}
        open={open}
      ></SmallScreenSortButton>
      <Drawer
        className="text-white bg-[linear-gradient(50deg,rgb(11,0,97),hsl(253deg,85%,10%)48%,hsl(264deg,89%,6%)60%,hsl(0deg,0%,0%)100%)!important]"
        title="Sort"
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
          <div className="flex items-center gap-4">
            <SortButton
              order={order}
              setOrder={setOrder}
              setOpen={setOpen}
              sort={sort}
              setSort={setSort}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}
