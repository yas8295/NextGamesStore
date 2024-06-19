import { useRouter } from "next/router";
import React from "react";
import GamePage from "@/Components/GamePage/GamePage";
import { LoadingOutlined } from "@ant-design/icons";

export default function Game({ game }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingOutlined className="text-[40px] text-[#3aadeb] my-7" />
      </div>
    );
  }

  return <GamePage game={game} />;
}

export const getStaticProps = async ({ params }) => {
  let game;

  try {
    const res = await fetch(
      `https://api.rawg.io/api/games/${params.game}?key=${process.env.RAWG_API_KEY}`
    );

    game = await res.json();
  } catch (error) {
    console.log("error");
  }

  if (!game) {
    return {
      notFound: true,
    };
  }

  return {
    props: { game },
  };
};

export const getStaticPaths = async () => {
  return {
    paths:[ ],
    fallback: true,
  };
};
