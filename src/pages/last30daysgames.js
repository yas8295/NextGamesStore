import GamesSide from "@/Components/GamesSide/GamesSide";
import { last30daysDates } from "@/helpers/helpers";
import React from "react";

export default function last30daysgames({ games }) {
  return (
    <GamesSide
      Key={"last30days"}
      games={games}
      titleOfCategory={"Last 30 Days"}
    ></GamesSide>
  );
}

export async function getStaticProps() {
  let games = null;

  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&dates=${last30daysDates}`
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
