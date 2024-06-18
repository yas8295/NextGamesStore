import GamesSide from "@/Components/GamesSide/GamesSide";
import { getBestOfLastYear } from "@/helpers/helpers";
import { getYear } from "date-fns";
import React from "react";

export default function popularinlastyear({ games }) {
  return (
    <GamesSide
      Key={"popularinlastyear"}
      games={games}
      titleOfCategory={`popular in ${getYear(new Date()) - 1}`}
    ></GamesSide>
  );
}

export async function getStaticProps() {
  let games = null;
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=${getBestOfLastYear}`
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
