import { useInfiniteQuery } from "react-query";

let errorFetch = false;

const fetchGames = async ({ pageParam = 1 }) => {
  if (pageParam > 4) return;
  try {
    const response = await fetch(
      `https://api.rawg.io/api/tags?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page=${pageParam}`
    );
    errorFetch = false;
    return response.json();
  } catch (error) {
    errorFetch = true;
    console.log(error);
  }
};

export const useAllTags = () => {
  const { data, fetchNextPage, isFetching, status } = useInfiniteQuery({
    queryKey: ["tags"],
    queryFn: fetchGames,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
    retry: 20,
    refetchOnMount: true,
    refetchOnReconnect: "always",
  });

  return {
    data,
    fetchNextPage,
    isFetching,
    status,
    errorFetch,
  };
};
