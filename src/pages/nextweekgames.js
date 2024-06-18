import GamesSide from "@/Components/GamesSide/GamesSide";
import { nextWeek } from "@/helpers/helpers";
import React from "react";

export default function nextweekgames({ games }) {
  return (
    <GamesSide
      Key={"nextweek"}
      games={games}
      titleOfCategory={"Next week"}
    ></GamesSide>
  );
}

export async function getStaticProps() {
  let games = null;
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=${nextWeek}`
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
