import { useQuery } from "react-query";

const fetchGameDlc = async (id) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${id}/additions?key=${process.env.RAWG_API_KEY}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetGameDlc = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["dlc" + id],
    queryFn: () => fetchGameDlc(id),
  });

  return {
    data,
    isLoading,
  };
};
