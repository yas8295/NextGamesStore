import { useQuery } from "react-query";

const fetchGameAchievements = async (id) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${id}/achievements?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetGameAchievements = (id) => {
  const { data } = useQuery({
    queryKey: ["achievements" + id],
    queryFn: () => fetchGameAchievements(id),
  });

  return {
    data,
  };
};
