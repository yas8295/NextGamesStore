import React from "react";
import MonthsList from "./MonthsList";
import { motion } from "framer-motion";
import WideScreenSortandFilter, {
  WideScreenFilterTag,
} from "./WideScreenSortandFilter/WideScreenSortandFilter";
import SmalScreenFilterandSort from "./SmalScreenFilterandSort/SmallScreenFilterandSort";
import HeaderTitle from "./HeaderTitle";

export default function GamesSideHeaderSection({
  titleOfCategory,
  description,
  setLayOut,
  month,
  setMonth,
  status,
  order,
  setOrder,
  sort,
  setSort,
  setParentPaltforms,
  setPaltforms,
  tags,
  setTags,
}) {
  const createMarkup = (text) => {
    return { __html: text };
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <HeaderTitle
          status={status}
          titleOfCategory={titleOfCategory}
          month={month}
        ></HeaderTitle>
        {description && (
          <p
            dangerouslySetInnerHTML={createMarkup(description)}
            className="mb-2 md:mt-[-10px]"
          ></p>
        )}
        <WideScreenFilterTag
          tags={tags}
          setTags={setTags}
        ></WideScreenFilterTag>
        {titleOfCategory.toLowerCase() === "release calendar" && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            layout
            transition={{ type: "spring", stiffness: 200, damping: 40 }}
            className="flex items-center gap-3 mb-4"
          >
            <MonthsList
              month={month}
              setMonth={setMonth}
              status={status}
            ></MonthsList>
          </motion.div>
        )}
      </div>
      <WideScreenSortandFilter
        order={order}
        setOrder={setOrder}
        month={month}
        setMonth={setMonth}
        sort={sort}
        setSort={setSort}
        setParentPaltforms={setParentPaltforms}
        setPaltforms={setPaltforms}
        setLayOut={setLayOut}
      ></WideScreenSortandFilter>
      <SmalScreenFilterandSort
        tags={tags}
        setTags={setTags}
        setParentPaltforms={setParentPaltforms}
        setPaltforms={setPaltforms}
        order={order}
        setOrder={setOrder}
        month={month}
        setMonth={setMonth}
        sort={sort}
        setSort={setSort}
      ></SmalScreenFilterandSort>
    </>
  );
}
