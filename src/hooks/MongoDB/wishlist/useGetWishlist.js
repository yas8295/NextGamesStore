import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

const fetchWishlist = async () => {
  try {
    const res = await fetch("/api/mongodb/wishlist");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetWishlist = () => {
  const { data: session, status } = useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist" + session?.user?.email],
    queryFn: () => fetchWishlist(),
    retry: 2,
  });

  return { data, isLoading, isError };
};
