import React from "react";
import { Cascader } from "antd";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function PlatformsFilterButton({
  setParentPaltforms,
  setPaltforms,
  setOpen = () => {},
}) {
  const router = useRouter();

  const getParentPlatformsList = async () => {
    const response = await fetch(
      `https://api.rawg.io/api/platforms/lists/parents?key=${process.env.RAWG_API_KEY}`
    );
    const data = response.json();
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["parentPlatforms"],
    queryFn: async () => await getParentPlatformsList(),
  });

  if (router.pathname.startsWith("/platforms")) {
    return null;
  }

  const filterPlatforms = data?.results?.filter((p) => p.id !== 6);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      layout
      transition={{ type: "spring", stiffness: 200, damping: 40 }}
    >
      <Cascader
        disabled={isLoading}
        className="w-[200px!important] overflow-hidden before:w-24 before:h-24 before:left-16 before:top-[-70px] before:absolute before:bg-[#b77dc1af] before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-[#2ddcff] after:rounded-full after:-z-10 after:blur-xl after:top-12 after:-right-5 bg-[#8c8c8c44!important] backdrop-blur-sm border-[2px] border-[#36709a] rounded-lg"
        size="large"
        placeholder="Platforms"
        expandTrigger="hover"
        options={filterPlatforms?.map((p) => ({
          value: p.id,
          label: p.name,
          children:
            p.platforms.length > 1 &&
            p.platforms.map((e) => ({ value: e.id, label: e.name })),
        }))}
        onChange={(value) => {
          if (!value) return;
          setParentPaltforms(value[0]);
          setPaltforms(value[1]);
          setOpen(false);
        }}
        onClear={() => {
          setParentPaltforms(null);
          setPaltforms(null);
        }}
      />
    </motion.div>
  );
}
