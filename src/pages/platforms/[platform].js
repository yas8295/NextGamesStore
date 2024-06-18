import GamesSide from "@/Components/GamesSide/GamesSide";
import { useGetPlatform } from "@/hooks/AllGamesHooks/useGetPlatform";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React from "react";

export default function Platform({ games }) {
  const router = useRouter();

  const { data } = useGetPlatform(router.query.platform);

  if (router.isFallback) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingOutlined className="text-[40px] text-[#3aadeb] my-7" />
      </div>
    );
  }

  return (
    <GamesSide
      Key={"allGames"}
      platform={router.query.platform}
      games={games}
      titleOfCategory={`games for ${data?.name}`}
      description={data?.description}
    />
  );
}

export async function getStaticProps({ params }) {
  let games = null;
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&platforms=${params.platform}`
    );

    if (res.ok) {
      games = await res.json();
    } else {
      console.error("Failed to fetch games:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error fetching games:", error);
  }

  if (!games) {
    return {
      notFound: true,
    };
  }

  return {
    props: { games },
    revalidate: 60,
  };
}

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { platform: "4" } },
      { params: { platform: "187" } },
      { params: { platform: "1" } },
      { params: { platform: "7" } },
      { params: { platform: "3" } },
      { params: { platform: "21" } },
    ],
    fallback: true,
  };
};
