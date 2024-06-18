import GamesSide from "@/Components/GamesSide/GamesSide";
import { getBestOfYear } from "@/helpers/helpers";
import React from "react";

export default function bestoftheyear({ games }) {
  return (
    <GamesSide
      Key={"bestoftheyear"}
      games={games}
      titleOfCategory={"Best of The Year"}
    ></GamesSide>
  );
}

export async function getStaticProps() {
  let games = null;
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=${getBestOfYear}&ordering=metacritic`
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
