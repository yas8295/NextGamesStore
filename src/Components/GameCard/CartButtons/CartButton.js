import { useMutateCart } from "@/hooks/MongoDB/cart/useMutateCart";
import React, { useEffect, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetCart } from "@/hooks/MongoDB/cart/useGetCart";

export default function CartButton({ game }) {
  const [isInCart, setIsInCart] = useState(false);

  const { mutate, isLoading: isMutate } = useMutateCart(setIsInCart);

  const { data, isLoading, isError } = useGetCart();

  useEffect(() => {
    if (data) {
      const isInCart = data?.cart?.cart?.find(
        (item) => item.gameId === game.id
      );
      setIsInCart(isInCart ? true : false);
    }
  }, [isLoading, data, game.id]);

  return (
    <div className="flex md:gap-6 gap-4 items-center justify-end md:px-3 px-1 mt-2 flex-wrap">
      <h1 className="md:text-[25px] text-[17px] font-semibold font-orbitron">
        ${game.price}
      </h1>
      <button
        disabled={isLoading || isMutate}
        onClick={() => {
          mutate({ game, method: isInCart ? "DELETE" : "POST" });
        }}
        className="active:scale-[0.90] duration-300 group relative flex items-center justify-center bg-gradient-to-r from-[#0070d3] to-[#ae00ff] overflow-hidden grow max-w-[280px] capitalize md:py-3 py-2 md:px-4 px-2 rounded-tr-xl rounded-bl-xl shadow-lg md:text-[17px] text-[13px] disabled:opacity-80 disabled:cursor-not-allowed font-orbitron"
      >
        <span className="text-gray-200 me-12 font-semibold text-pretty transform group-hover:translate-x-20 transition-all duration-300">
          {isInCart ? "Remove from cart" : "Add to cart"}
        </span>
        <span className="absolute right-0 h-full md:w-14 w-11 rounded-tr-xl rounded-bl-xl shadow-lg bg-gradient-to-r from-[#cd37ff] to-[#7a5573] border border-[white] flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          {isMutate || isLoading ? (
            <LoadingOutlined className="md:text-[25px] text-[20px] text-[#ffffff]" />
          ) : (
            <GiShoppingCart className="md:text-[27px] text-[22px]" />
          )}
        </span>
      </button>
    </div>
  );
}
