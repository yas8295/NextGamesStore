import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

const fetchCart = async () => {
  try {
    const res = await fetch("/api/mongodb/cart");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetCart = () => {
  const { data: session, status } = useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart" + session?.user?.email],
    queryFn: () => fetchCart(),
    retry: 2,
  });

  return { data, isLoading, isError };
};
