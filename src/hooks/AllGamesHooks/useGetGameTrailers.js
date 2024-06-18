import { useQuery } from "react-query";

const fetchGameTrailers = async (id) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${id}/movies?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetGameTrailers = (id) => {
  const { data } = useQuery({
    queryKey: ["trailers" + id],
    queryFn: () => fetchGameTrailers(id),
  });

  return {
    data,
  };
};
