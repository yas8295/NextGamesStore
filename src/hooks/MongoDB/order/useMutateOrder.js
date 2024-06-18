import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const mutateOrder = async (order, method) => {
  try {
    const res = await fetch("/api/mongodb/order", {
      method: method,
      body: JSON.stringify({
        order,
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

export const useMutateOrder = (setStep = undefined, cancel = undefined) => {
  const { push } = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ order, method }) => mutateOrder(order, method),
    onSuccess: ({ message }) => {
      toast.success(() => message);
      setStep && setStep(2);
      cancel && push("/orders");
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
