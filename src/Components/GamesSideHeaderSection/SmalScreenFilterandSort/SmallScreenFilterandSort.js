import React from "react";
import FilterOptions from "./FilterOptions";
import SortOptions from "./SortOptions";
import CartOverview from "./CartOverview";

export default function SmallScreenFilterandSort({
  tags,
  setTags,
  setParentPaltforms,
  setPaltforms,
  order,
  setOrder,
  month,
  setMonth,
  sort,
  setSort,
}) {
  return (
    <div className="fixed w-full h-[50px] rounded-tl-3xl rounded-tr-3xl bg-[#ffffffaf] backdrop-blur-md bottom-0 left-0 flex items-center justify-between gap-2 px-2 z-[999] sm:hidden">
      <div className="flex items-center gap-2">
        <FilterOptions
          setParentPaltforms={setParentPaltforms}
          setPaltforms={setPaltforms}
          tags={tags}
          setTags={setTags}
          month={month}
          setMonth={setMonth}
        ></FilterOptions>
        <SortOptions
          order={order}
          setOrder={setOrder}
          sort={sort}
          setSort={setSort}
        ></SortOptions>
      </div>
      <CartOverview />
    </div>
  );
}
