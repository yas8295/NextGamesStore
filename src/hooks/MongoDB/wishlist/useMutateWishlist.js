import NotifyGame from "@/Components/GameCard/NotifyGame";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const mutateWishlist = async (game, method) => {
  try {
    const res = await fetch("/api/mongodb/wishlist", {
      method: method,
      body: JSON.stringify({
        game,
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

export const useMutateWishlist = (setIsWishlist) => {
  const { push } = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ game, method }) => mutateWishlist(game, method),
    onSuccess: ({ message, game }) => {
      queryClient.invalidateQueries({ queryKey: "wishlist" });
      toast.success(() => <NotifyGame message={message} game={game} />);
      setIsWishlist((prev) => (prev ? false : true));
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        String(error).split(":")[2] == 401
          ? "Sign in to add games to wishlist"
          : "Something went wrong"
      );
      String(error).split(":")[2] == 401 && push("/");
    },
  });

  return { mutate, isLoading };
};
