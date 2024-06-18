import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSearchGame } from "@/hooks/AllGamesHooks/useSearchGame";
import { AnimatePresence } from "framer-motion";
import SearchList from "./SearchList";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching, fetchNextPage } = useSearchGame(search);

  return (
    <div
      className={`${search && "md:relative fixed top-0 z-[999999999999]"} ${
        search && "w-screen"
      } md:relative z-[99] grow md:w-fit`}
    >
      <Input
        className={`${
          search && "md:rounded-3xl rounded-none bg-[#4f4f4fef]"
        } bg-[#ffffff36] text-[#cbcbcb] hover:text-[black!important] focus-within:text-[black!important] flex gap-1 items-center backdrop-blur-lg border-none rounded-3xl ps-3 py-2`}
        size="large"
        placeholder="Search games..."
        allowClear
        onChange={(e) => {
          setSearch(e.target.value ? e.target.value : "");
        }}
        prefix={<SearchOutlined />}
      />
      <AnimatePresence mode="wait">
        {search.length > 0 && (
          <SearchList
            search={search}
            setSearch={setSearch}
            data={data}
            isLoading={isLoading}
            isFetching={isFetching}
            fetchNextPage={fetchNextPage}
          ></SearchList>
        )}
      </AnimatePresence>
    </div>
  );
}
