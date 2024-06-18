import { useInfiniteQuery } from "react-query";

const fetchSearchGame = async (page = 1, search) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page=${page}&search=${search}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useSearchGame = (search) => {
  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: [search],
    queryFn: ({ pageParam }) => fetchSearchGame(pageParam, search),
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  return {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
  };
};
