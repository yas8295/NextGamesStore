import React from "react";
import GamesSide from "@/Components/GamesSide/GamesSide";

export default function home({ games }) {
  return (
    <GamesSide
      Key={"allGames"}
      games={games}
      titleOfCategory={"All Games"}
    ></GamesSide>
  );
}

export async function getStaticProps() {
  let games = null;
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
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
