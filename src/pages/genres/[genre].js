import GamesSide from "@/Components/GamesSide/GamesSide";
import { useGetGenres } from "@/hooks/AllGamesHooks/useGetGenres";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React from "react";

export default function Genre({ games }) {
  const router = useRouter();

  const { data } = useGetGenres(router.query.genre);

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
      genre={router.query.genre}
      games={games}
      titleOfCategory={`${data?.name} Games`}
      description={data?.description}
    />
  );
}

export async function getStaticProps({ params }) {
  let games = null;
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&genres=${params.genre}`
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
    
  };
}

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { genre: "4" } },
      { params: { genre: "51" } },
      { params: { genre: "3" } },
      { params: { genre: "5" } },
    ],
    fallback: true,
  };
};
