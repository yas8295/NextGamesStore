import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const signout = async () => {
  try {
    await signOut({
      redirect: false,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export function useSignout() {
  const { push } = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      push("/");
    },
  });

  return { mutate, isLoading };
}
