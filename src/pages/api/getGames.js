const fetchGames = async (
  page = 1,
  date = null,
  order = null,
  parentPlatforms = null,
  platforms = null,
  genres = null,
  tags = null,
  metacritic = null
) => {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${
      process.env.NEXT_PUBLIC_RAWG_API_KEY
    }&page=${page}&dates=${date}&ordering=${order}&${
      parentPlatforms && `parent_platforms=${parentPlatforms}`
    }&${platforms && `platforms=${platforms}`}&${
      genres && `genres=${genres}`
    }&${tags && `tags=${tags}`}&${
      metacritic && `metacritic=${metacritic || "80,100"}`
    }`
  );

  return await res.json();
};

export default async function handler(req, res) {
  let games;

  if (req.method === "POST") {
    const {
      page,
      date,
      order,
      parentPlatforms,
      platforms,
      genres,
      tags,
      metacritic,
    } = JSON.parse(req.body);

    try {
      games = await fetchGames(
        page,
        date,
        order,
        parentPlatforms,
        platforms,
        genres,
        tags,
        metacritic
      );
    } catch (err) {
      console.log(err);
    }

    res.status(200).json({ games });
  }

  if (req.method === "GET") {
    try {
      games = await fetchGames();
    } catch (err) {
      console.log(err);
    }

    res.status(200).json({ games });
  }
}
