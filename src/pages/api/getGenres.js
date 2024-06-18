const fetchGenres = async () => {
  const res = await fetch(
    `https://api.rawg.io/api/genres?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
  );

  return await res.json();
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const genres = await fetchGenres();
      res.status(200).json({ genres });
    } catch (error) {
      console.log(error);
    }
  }
}
