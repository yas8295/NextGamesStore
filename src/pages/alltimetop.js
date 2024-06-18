import GamesSide from "@/Components/GamesSide/GamesSide";
import React from "react";

export default function alltimetop({ games }) {
  return (
    <GamesSide
      Key={"alltimetop"}
      games={games}
      titleOfCategory={`all Time Top 250`}
    ></GamesSide>
  );
}

export async function getStaticProps() {
  let games = null;
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&metacritic=85,100&ordering=metacritic`
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
