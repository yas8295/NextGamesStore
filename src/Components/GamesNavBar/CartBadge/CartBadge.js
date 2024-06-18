import React from "react";
import { Avatar, Badge, Popover } from "antd";
import { ImCart } from "react-icons/im";
import NotifyGame from "@/Components/GameCard/NotifyGame";
import { useRouter } from "next/router";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useGetCart } from "@/hooks/MongoDB/cart/useGetCart";
import CartClearButton from "@/Components/GameCard/CartButtons/CartClearButton";

export default function CartBadge() {
  const { push } = useRouter();
  const { data: cart, isLoading } = useGetCart();

  const total = cart?.cart?.cart.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);

  const cartGamesCount = cart?.cart?.cart.length;

  return (
    <Popover
      title={
        cart && (
          <div className="flex justify-between items-center gap-2 border-b-2 pb-2 border-gray-400 mb-4">
            <h1 className="md:text-[20px] text-[17px]">
              {cartGamesCount > 0 && (
                <>
                  Cart Subtotal:{" "}
                  <span className="font-bold">${total?.toFixed(2)}</span>
                </>
              )}
              {cartGamesCount === 0 && "Shopping Cart"}
            </h1>
            {cartGamesCount > 0 && <CartClearButton />}
          </div>
        )
      }
      arrow={false}
      rootClassName="max-h-[300px] min-w-[300px] md:max-w-full max-w-[280px] overflow-auto rounded-xl backdrop-blur-lg"
      placement="bottomLeft"
      content={
        cart?.cart?.cart.length ? (
          <div className="flex flex-col gap-3">
            {cart?.cart?.cart.map((game) => (
              <NotifyGame key={game.gameId} id={game.gameId} cart={cart} />
            ))}
          </div>
        ) : (
          <div className="cursor-default md:w-64 w-52 h-32 flex flex-col gap-1 justify-center items-center">
            <MdOutlineRemoveShoppingCart className="md:text-[55px] text-[45px] text-[#5a595cec]" />
            <h1 className="text-[18px]">Cart is empty</h1>
          </div>
        )
      }
    >
      <Badge
        onClick={() => {
          push("/cart");
        }}
        count={cartGamesCount}
        showZero={true}
        offset={[-5, 2]}
        className="md:block hidden cursor-pointer"
      >
        <Avatar icon={<ImCart style={{ fontSize: "30px" }} />} size="large" />
      </Badge>
    </Popover>
  );
}
