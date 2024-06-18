import React from "react";
import { Avatar, Badge, Dropdown } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import { useGetWishlist } from "@/hooks/MongoDB/wishlist/useGetWishlist";
import NotifyGame from "@/Components/GameCard/NotifyGame";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHeartCircleExclamation } from "react-icons/fa6";

export default function WishlistBadge() {
  const { push } = useRouter();
  const { data: wishList, isLoading } = useGetWishlist();

  const wishlistGamesCount = wishList?.wishList?.wishlist.length;

  return (
    <Dropdown
      disabled={isLoading}
      overlayClassName="max-h-[300px] min-w-[280px] overflow-auto rounded-xl backdrop-blur-lg"
      menu={{
        items: wishList?.wishList?.wishlist.length
          ? wishList?.wishList?.wishlist.map((game, i) => ({
              key: `${i}`,
              label: (
                <Link href={`/game/${game.gameId}`}>
                  <NotifyGame id={game.gameId} />
                </Link>
              ),
            }))
          : [
              {
                key: `1`,
                label: (
                  <div className="cursor-default md:w-64 w-52 h-32 flex flex-col gap-1 justify-center items-center">
                    <FaHeartCircleExclamation className="md:text-[55px] text-[45px] text-[#5a595cec]" />
                    <h1 className="text-[18px]">Wishlist is empty</h1>
                  </div>
                ),
                style: { cursor: "default" },
              },
            ],
      }}
    >
      <Badge
        onClick={() => {
          push("/wishlist");
        }}
        count={wishlistGamesCount}
        showZero={true}
        offset={[-5, 2]}
        className="cursor-pointer"
      >
        <Avatar
          icon={
            <HeartTwoTone twoToneColor="white" style={{ fontSize: "30px" }} />
          }
          size="large"
        />
      </Badge>
    </Dropdown>
  );
}
