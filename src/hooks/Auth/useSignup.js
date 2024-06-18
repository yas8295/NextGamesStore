import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useSignin } from "./useSignin";

let errorMessage = "";

const signup = async (userName, email, password) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ userName, email, password }),
    });
    if (!res.ok) {
      errorMessage =
        res.status === 500 ? "Check your network!" : await res.json();
      throw new Error(res);
    }
    errorMessage = "";
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
};

export function useSignup() {
  const { mutate: signIn } = useSignin();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ userName, email, password }) =>
      signup(userName, email, password),
    onError: (error) => {
      toast.error(errorMessage.message || errorMessage);
    },
    onSuccess: ({ message, account }) => {
      toast.success(`${message}`);
      signIn({ email: account.email, password: account.password });
    },
  });

  return { mutate, isLoading };
}
