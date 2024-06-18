import { useQuery } from "react-query";

const fetchPlatforms = async (id) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/platforms/${String(id)}?key=${
        process.env.RAWG_API_KEY
      }`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetPlatform = (id) => {
  const { data } = useQuery({
    queryKey: [id],
    queryFn: () => fetchPlatforms(id),
  });

  return {
    data,
  };
};
