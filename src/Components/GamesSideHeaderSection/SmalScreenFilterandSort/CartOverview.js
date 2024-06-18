import { useGetCart } from "@/hooks/MongoDB/cart/useGetCart";
import { Drawer } from "antd";
import React, { useState } from "react";
import { FaTags } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";
import NotifyGame from "@/Components/GameCard/NotifyGame";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import Link from "next/link";

export default function CartOverview() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { data: cart, isLoading } = useGetCart();

  const cartGamesCount = cart?.cart?.cart.length;

  const totalPrice = cart?.cart?.cart.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);

  const tax = totalPrice * 0.03;

  return (
    <>
      <button
        onClick={showDrawer}
        className="w-48 py-[6px] rounded-tr-3xl bg-transparent items-center justify-center flex bg-white text-black duration-300 cursor-pointer active:scale-[0.98] gap-2"
      >
        Checkout
        <FaTags />
      </button>
      <Drawer
        className="text-white bg-[linear-gradient(50deg,rgb(11,0,97),hsl(253deg,85%,10%)48%,hsl(264deg,89%,6%)60%,hsl(0deg,0%,0%)100%)!important]"
        title={
          <h1 className="text-[25px]">
            Shopping cart ({isLoading ? <LoadingOutlined /> : cartGamesCount})
          </h1>
        }
        placement="right"
        width={"90%"}
        closable={true}
        onClose={onClose}
        open={open}
        styles={{
          body: { padding: "15px", overflowX: "hidden" },
          header: { padding: "15px 10px" },
          content: { overflowX: "hidden" },
        }}
      >
        {isLoading && (
          <div className="w-full flex justify-center mt-10">
            <LoadingOutlined className="text-[40px] text-[#329fff]" />
          </div>
        )}
        {cart?.cart?.cart.length && !isLoading ? (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex flex-col gap-3 pb-5 h-full overflow-auto">
              {cart?.cart?.cart.map((game) => (
                <NotifyGame key={game.gameId} id={game.gameId} cart={cart} />
              ))}
            </div>
            <div className="flex flex-col pt-5 gap-2 border-t-[1px] border-gray-500">
              <div className="flex justify-between items-center gap-2">
                <h1 className="text-[19px]">Subtotal:</h1>
                <p className="text-[17px] font-semibold">
                  ${totalPrice?.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <h1 className="text-[19px] flex items-center gap-2">
                  Tax estimated:
                </h1>
                <p className="text-[17px] font-semibold">
                  ${(totalPrice * 0.03).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <h1 className="text-[19px] font-semibold">Order Total</h1>
                <p className="text-[19px] font-semibold text-[#ff6969]">
                  ${totalPrice + tax}
                </p>
              </div>
              <button
                disabled={isLoading}
                className="text-[16px] py-2 mt-2 items-center justify-center rounded-3xl flex border-[1.5px] border-[#ffffff] shadow-xl bg-[#3642c6] hover:opacity-80 text-white hover:text-white cursor-pointer active:scale-[0.95] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Link
                  href={"/cart"}
                  className="w-full flex justify-center items-center gap-3"
                >
                  Checkout <FaTags />
                </Link>
              </button>
            </div>
          </div>
        ) : (
          !isLoading && (
            <div className="w-full h-[50%] flex flex-col items-center justify-center">
              <MdOutlineRemoveShoppingCart className="text-[80px] text-[#909090ec]" />
              <h1 className="text-[23px]">Cart is empty</h1>
            </div>
          )
        )}
      </Drawer>
    </>
  );
}
