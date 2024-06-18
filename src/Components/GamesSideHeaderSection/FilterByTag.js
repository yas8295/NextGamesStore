import { useAllTags } from "@/hooks/AllGamesHooks/useAllTags";
import { Skeleton, Tag } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

export default function FilterByTag({ tags, setTags }) {
  const { data, fetchNextPage, isFetching, status, errorFetch } = useAllTags();

  if (errorFetch && status !== "success") {
    return (
      <div className="flex items-center flex-wrap gap-2 mb-3">
        <h1 className="text-[18px] opacity-60">Related tags:</h1>
        {Array.from({ length: 10 }, (e, i) => (
          <Skeleton.Input
            key={i}
            className="w-6 rounded-[50px!important]"
            active={true}
            size="default"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center flex-wrap gap-[5px] mb-3">
      <h1 className="text-[18px] opacity-60">Related tags:</h1>
      {status !== "loading"
        ? data?.pages?.flatMap((page) =>
            page?.results?.map((tag) => (
              <motion.div
                key={tag.id}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                layout
                transition={{ type: "spring", stiffness: 200, damping: 40 }}
              >
                <Tag.CheckableTag
                  className="relative me-0 flex justify-center items-center px-5 py-2 text-[15px] rounded-3xl bg-[#565656d8] backdrop-blur-sm shadow-md before:w-24 before:h-24 before:left-16 before:top-[-70px] before:absolute before:bg-[#e682f5af] before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-[#2ddcffb4] after:rounded-full after:-z-10 after:blur-xl after:top-12 after:-right-5 overflow-hidden opacity-80 hover:bg-[#ffffff90] text-white"
                  checked={tags?.includes(tag.id)}
                  onChange={() => {
                    !tags?.includes(tag.id)
                      ? setTags((tags) => (tags ? [...tags, tag.id] : [tag.id]))
                      : setTags((tags) =>
                          tags.length === 1
                            ? null
                            : tags.filter((t) => t !== tag.id)
                        );
                  }}
                >
                  {tag.name}
                </Tag.CheckableTag>
              </motion.div>
            ))
          )
        : Array.from({ length: 10 }, (e, i) => (
            <Skeleton.Input
              key={i}
              className="w-6 rounded-[50px!important]"
              active={true}
              size="default"
            />
          ))}
      {status !== "loading" && data?.pages?.[data?.pages?.length - 1] ? (
        <button
          onClick={() => fetchNextPage()}
          className="text-[20px] font-bold opacity-80 flex justify-center items-center w-10 h-10 rounded-full bg-[#ffffff1d]"
        >
          {isFetching ? (
            <LoadingOutlined className="text-[18px] text-[#ffffff]" />
          ) : (
            "⋯"
          )}
        </button>
      ) : (
        <h1 className="opacity-80">
          {(!isFetching || status !== "loading") && "🔎 No more tags..."}
        </h1>
      )}
    </div>
  );
}
