import { useQuery } from "react-query";

const fetchGames = async (id) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetGame = (id) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [id],
    queryFn: () => fetchGames(id),
    retry: 2,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};
