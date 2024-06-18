import GamesSide from "@/Components/GamesSide/GamesSide";
import { thisWeek } from "@/helpers/helpers";
import React from "react";

export default function thisWeekGames({ games }) {
  return (
    <GamesSide
      Key={"thisweek"}
      games={games}
      titleOfCategory={"This week"}
    ></GamesSide>
  );
}

export async function getStaticProps() {
  let games = null;
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=${thisWeek}`
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
