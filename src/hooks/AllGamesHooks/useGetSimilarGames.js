import { useQuery } from "react-query";

const fetchSimilarGames = async (
  parent_platforms,
  tags = "singleplayer",
  genres,
  publishers
) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&parent_platforms=${parent_platforms}&tags=${tags}&genres=${genres}&publishers=${publishers}&ordering=-released,-rating,-metacritic`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetSimilarGames = (
  game,
  parent_platforms,
  tags,
  genres,
  publishers
) => {
  const { data, isLoading } = useQuery({
    queryKey: [game, parent_platforms, tags, genres, publishers],
    queryFn: () =>
      fetchSimilarGames(parent_platforms, tags, genres, publishers),
  });

  return {
    data,
    isLoading,
  };
};
