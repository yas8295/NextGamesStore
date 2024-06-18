import {
  getBestOfLastYear,
  getBestOfYear,
  last30daysDates,
  nextWeek,
  thisWeek,
} from "@/helpers/helpers";
import { useInfiniteQuery } from "react-query";

const getDates = (key) => {
  switch (key) {
    case "last30days":
      return last30daysDates;
    case "thisweek":
      return thisWeek;
    case "nextweek":
      return nextWeek;
    case "bestoftheyear":
      return getBestOfYear;
    case "popularinlastyear":
      return getBestOfLastYear;
    default:
      undefined;
  }
};

let errorFetchNextPage = false;

const fetchGames = async (
  page = 1,
  key,
  date = undefined,
  order = undefined,
  parentPlatforms = undefined,
  platforms = undefined,
  genres = undefined,
  tags = undefined,
  metacritic = undefined
) => {
  try {
    const response = await fetch("/api/getGames", {
      method: "POST",
      body: JSON.stringify({
        page: page,
        date: date || getDates(key[0].split("-")[0]),
        order: order,
        parentPlatforms: parentPlatforms,
        platforms: platforms,
        genres: genres,
        tags: tags,
        metacritic: metacritic,
      }),
    });
    errorFetchNextPage = false;
    return response.json();
  } catch (error) {
    return (errorFetchNextPage = true);
  }
};

export const useAllGames = (
  key,
  date,
  order,
  parentPlatforms,
  platforms,
  genres,
  tags,
  metacritic
) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      key +
        `${date ? `-${date}` : ""}` +
        `${order ? `-${order}` : ""}` +
        `${parentPlatforms ? `-${parentPlatforms}` : ""}` +
        `${platforms ? `-${platforms}` : ""}` +
        `${genres ? `-${genres}` : ""}` +
        `${tags ? `-${tags}` : ""}`,
      +`${metacritic ? `-${metacritic}` : ""}`,
    ],
    queryFn: ({ pageParam, queryKey }) =>
      fetchGames(
        pageParam,
        queryKey,
        date,
        order,
        parentPlatforms,
        platforms,
        genres,
        tags,
        metacritic
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
    retry: 3,
    cacheTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnReconnect: "always",
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    errorFetchNextPage,
  };
};
