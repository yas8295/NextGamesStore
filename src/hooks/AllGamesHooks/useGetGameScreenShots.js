import { useQuery } from "react-query";

const fetchGameScreenShots = async (id) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.NEXT_PUBLIC_NEXT_PUBLIC_RAWG_API_KEY}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetGameScreenShots = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["screenshots" + id],
    queryFn: () => fetchGameScreenShots(id),
  });

  return {
    data,
    isLoading,
  };
};
