import React from "react";
import { motion } from "framer-motion";
import CategoryCard from "@/Components/CategoryCard/CategoryCard";

export default function platforms({ platforms }) {
  return (
    <>
      <div className="text-nowrap w-fit sm:text-[60px] text-[35px] font-extrabold">
        <div className="flex capitalize sm:gap-2 gap-[3px]">
          {"platforms".split("").map((c, i) => (
            <motion.span
              className={`${i !== 0 && "lowercase"}`}
              initial={{ opacity: 0, x: "400px" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 40,
                delay: `${i >= 10 ? 1 : i >= 20 ? 2 : 0}.${
                  Array.from(String(i), Number)[1] || i
                }`,
              }}
              key={i}
            >
              {c}
            </motion.span>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: "10%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`flex items-center justify-center gap-5 w-full flex-wrap`}
      >
        {platforms?.results?.map((platform) => (
          <CategoryCard
            id={platform.id}
            key={platform.id}
            name={platform.name}
            games={platform.games}
            games_count={platform.games_count}
            image={platform.image_background}
            category={"platforms"}
          ></CategoryCard>
        ))}
      </motion.div>
    </>
  );
}

export async function getStaticProps() {
  let platforms = null;
  try {
    const res = await fetch(
      `https://api.rawg.io/api/platforms?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );

    if (res.ok) {
      platforms = await res.json();
    } else {
      console.error("Failed to fetch games:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error fetching games:", error);
  }
  if (!platforms) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      platforms,
    },
    revalidate: 60,
  };
}
