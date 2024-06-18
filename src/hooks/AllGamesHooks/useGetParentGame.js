import { useQuery } from "react-query";

const fetchParentGame = async (id) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${id}/parent-games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetParentGame = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["ParentGame" + id],
    queryFn: () => fetchParentGame(id),
  });

  return {
    data,
    isLoading,
  };
};
