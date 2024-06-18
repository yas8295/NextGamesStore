import { useQuery } from "react-query";
import { useSession } from "next-auth/react";

const fetchOrders = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/mongodb/order");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetOrders = () => {
  const { data: session, status } = useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders" + session?.user?.email],
    queryFn: () => fetchOrders(),
    retry: 2,
  });

  return { data, isLoading, isError };
};
