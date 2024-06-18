import { useQuery } from "react-query";

const fetchPlatFromsTopGames = async (id) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&platforms=${id}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetPlatFromsTopGames = (id) => {
  const { data } = useQuery({
    queryKey: [id],
    queryFn: () => fetchPlatFromsTopGames(id),
  });

  return {
    data,
  };
};
