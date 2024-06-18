import React from "react";
import GamesSide from "@/Components/GamesSide/GamesSide";
import { getMonth as thisMonth } from "@/helpers/helpers.js";
import { getMonth } from "date-fns";

export default function releasecalendar({ games }) {
  return (
    <GamesSide
      Key={"releaseCalendar"}
      games={games}
      titleOfCategory={"release calendar"}
    ></GamesSide>
  );
}

export async function getStaticProps() {
  let games = null;
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${
        process.env.NEXT_PUBLIC_RAWG_API_KEY
      }&dates=${thisMonth(getMonth(new Date()))}`
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
