import { useQuery } from "react-query";

const fetchGameSeries = async (id) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${id}/game-series?key=${process.env.NEXT_PUBLIC_NEXT_PUBLIC_RAWG_API_KEY}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetGameSeries = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["series" + id],
    queryFn: () => fetchGameSeries(id),
  });

  return {
    data,
    isLoading,
  };
};
