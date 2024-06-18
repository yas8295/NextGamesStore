import { useGetCart } from "@/hooks/MongoDB/cart/useGetCart";
import React from "react";
import OrderItem from "./OrderItem";
import { BsQuestionOctagonFill } from "react-icons/bs";
import { Popover } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function OrderReview() {
  const { data: cart, isLoading } = useGetCart();

  const totalPrice = cart?.cart?.cart.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);

  const tax = totalPrice * 0.03;

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingOutlined className="text-[40px] text-[#3aadeb] my-7" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mb-8 mt-4">
      {cart?.cart?.cart?.map((game) => (
        <div className="flex justify-between gap-3" key={game.gameId}>
          <OrderItem id={game.gameId} />
          <div className="flex flex-col items-end gap-2 min-w-[100px]">
            <h1>
              <span className="font-semibold">Quantity:</span> {game.quantity}
            </h1>
            <h1>${(game.price * game.quantity).toFixed(2)}</h1>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center gap-2 mt-3">
        <h1 className="md:text-[20px] text-[17px] flex items-center gap-2">
          Tax estimate{" "}
          <Popover
            overlayClassName="md:max-w-[300px]"
            arrow={false}
            content={
              <div>
                <p>
                  Enter the estimated amount of tax you expect to pay for the
                  current fiscal year.
                </p>
                <p>
                  This helps in planning your finances and ensuring you set
                  aside adequate funds for tax payments.
                </p>
              </div>
            }
            title="Tax estimate"
          >
            <BsQuestionOctagonFill className="cursor-pointer hover:opacity-60 duration-300" />
          </Popover>
        </h1>
        <p className="md:text-[20px] text-[17px] font-semibold">
          ${(totalPrice * 0.03).toFixed(2)}
        </p>
      </div>
      <div className="flex justify-between items-center gap-2">
        <h1 className="md:text-[22px] text-[19px] font-semibold">
          Order Total
        </h1>
        <p className="md:text-[22px] text-[19px] font-semibold">
          ${totalPrice + tax}
        </p>
      </div>
    </div>
  );
}
