import { useGetWishlist } from "@/hooks/MongoDB/wishlist/useGetWishlist";
import { useMutateWishlist } from "@/hooks/MongoDB/wishlist/useMutateWishlist";
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

export default function WishListButton({ game }) {
  const [isWishlist, setIsWishlist] = useState(false);

  const { mutate, isLoading: loadingMutate } = useMutateWishlist(setIsWishlist);

  const { data, isLoading: loadingData } = useGetWishlist();

  useEffect(() => {
    if (data) {
      const isWishlist = data?.wishList?.wishlist?.find(
        (item) => item.gameId === game.id
      );
      setIsWishlist(isWishlist ? true : false);
    }
  }, [loadingData, data, game.id]);

  return (
    <>
      <input
        disabled={loadingData || loadingMutate}
        checked={isWishlist}
        defaultValue={isWishlist}
        className="hidden"
        type="checkbox"
        id="favorite"
        onChange={() => {}}
      />
      <label
        onClick={() => {
          !loadingData && !loadingMutate
            ? mutate({
                game,
                method: isWishlist ? "DELETE" : "POST",
              })
            : {};
        }}
        htmlFor="favorite"
        className={` ${
          loadingData || loadingMutate
            ? "opacity-90 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        {loadingData || loadingMutate ? (
          <LoadingOutlined className="md:text-[25px] text-[20px] text-[#ffffff]" />
        ) : (
          <svg
            className="heart md:w-6 md:h-6 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        )}
      </label>
    </>
  );
}
