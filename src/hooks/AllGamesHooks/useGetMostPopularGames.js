import { getYear } from "date-fns";
import { useQuery } from "react-query";

const fetchGames = async () => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${
        process.env.RAWG_API_KEY
      }&dates=${getYear(new Date())}-01-01,${getYear(
        new Date()
      )}-12-31&page_size=${5}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetMostPopularGames = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["most-popular"],
    queryFn: fetchGames,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
