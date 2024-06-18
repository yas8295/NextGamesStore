import React from "react";
import { motion } from "framer-motion";
import ViewButtons from "../ViewButtons";
import SortButton from "../SortButton";
import PlatformsFilterButton from "../PlatformsFilterButton";
import FilterByTag from "../FilterByTag";
import ReleaseDateButton from "../ReleaseDateButton";

export default function wideScreenSortandFilter({
  setLayOut,
  order,
  setOrder,
  month,
  setMonth,
  sort,
  setSort,
  setParentPaltforms,
  setPaltforms,
}) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 200, damping: 40 }}
      className="w-full sm:flex hidden items-end justify-between"
    >
      <div className="flex items-center gap-3 flex-wrap">
        <SortButton
          order={order}
          setOrder={setOrder}
          sort={sort}
          setSort={setSort}
        ></SortButton>
        <ReleaseDateButton
          month={month}
          setMonth={setMonth}
        ></ReleaseDateButton>
        <PlatformsFilterButton
          setParentPaltforms={setParentPaltforms}
          setPaltforms={setPaltforms}
        ></PlatformsFilterButton>
      </div>
      <ViewButtons setLayOut={setLayOut}></ViewButtons>
    </motion.div>
  );
}

export function WideScreenFilterTag({ tags, setTags }) {
  return (
    <div className="sm:flex hidden">
      <FilterByTag tags={tags} setTags={setTags}></FilterByTag>
    </div>
  );
}
