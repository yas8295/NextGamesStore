import HomePage from "@/Components/HomePage/HomePage";
import { getSession } from "next-auth/react";

export default function Home() {
  return <HomePage></HomePage>;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session },
  };
}
