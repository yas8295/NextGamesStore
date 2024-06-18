import NotifyGame from "@/Components/GameCard/NotifyGame";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const mutateCart = async (game, method, operation = undefined) => {
  try {
    const res = await fetch("http://localhost:3000/api/mongodb/cart", {
      method: method,
      body: JSON.stringify({
        game,
        operation,
      }),
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const useMutateCart = (setIsInCart = undefined) => {
  const { push } = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ game, method, operation }) =>
      mutateCart(game, method, operation),
    onSuccess: ({ message, game }) => {
      queryClient.invalidateQueries({ queryKey: "cart" });
      toast.success(() =>
        message === "Cleared cart successfully" ? (
          message
        ) : (
          <NotifyGame message={message} game={game} />
        )
      );
      setIsInCart && setIsInCart((prev) => (prev ? false : true));
    },
    onError: (error) => {
      toast.error(
        String(error).split(":")[2] == 401
          ? "Sign in to add games to cart"
          : "Something went wrong"
      );
      String(error).split(":")[2] == 401 && push("/");
    },
  });

  return { mutate, isLoading };
};
