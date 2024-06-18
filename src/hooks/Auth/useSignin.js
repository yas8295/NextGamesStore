import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const signin = async (email, password) => {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    if (res.error) {
      throw new Error(res.error);
    }
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export function useSignin() {
  const { push } = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => signin(email, password),
    onError: (error) => {
      toast.error(
        String(error).split(":")[2].includes("querySrv")
          ? "Check your network!"
          : `${String(error).split(":")[2]}`
      );
    },
    onSuccess: () => {
      toast.success("Signed in successfully");
      push("/home");
    },
  });

  return { mutate, isLoading };
}
