const fetchGame = async (game) => {
  const response = await fetch(
    `https://api.rawg.io/api/games/${game}?key=${process.env.RAWG_API_KEY}`
  );

  return await response.json();
};

export default async function handler(req, res) {
  const { game } = req.query;

  if (req.method === "GET") {
    try {
      const games = await fetchGame(game);
      return res.status(200).json({ games });
    } catch (error) {
      console.log(error);
    }
  }
}
