import { useQuery } from "react-query";

const fetchGenres = async (id) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/genres/${String(id)}?key=${
        process.env.NEXT_PUBLIC_RAWG_API_KEY
      }`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetGenres = (id) => {
  const { data } = useQuery({
    queryKey: [id],
    queryFn: () => fetchGenres(id),
  });

  return {
    data,
  };
};
