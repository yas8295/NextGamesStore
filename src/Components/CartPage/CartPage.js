import React from "react";
import HeaderTitle from "../GamesSideHeaderSection/HeaderTitle";
import CartItemsSide from "./CartItems/CartItemsSide";
import OrderSummarySide from "./OrderSummary/OrderSummarySide";
import { useGetCart } from "@/hooks/MongoDB/cart/useGetCart";
import ErrorComponent from "../GamesSide/ErrorComponent";
import EmptyCart from "./EmptyCart";
import { LoadingOutlined } from "@ant-design/icons";

export default function CartPage() {
  const { data: cart, isLoading, isError } = useGetCart();

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <>
      <HeaderTitle titleOfCategory="Shopping Cart" />
      {cart && !isLoading ? (
        cart &&
        cart?.cart?.cart.length !== 0 &&
        !isLoading && (
          <div className="flex w-full gap-7 xl:flex-row flex-col md:mt-10 mt-7">
            <CartItemsSide cart={cart} />
            <OrderSummarySide cart={cart} />
          </div>
        )
      ) : (
        <div className="w-full mt-20 flex justify-center items-center">
          <LoadingOutlined className="text-[40px] text-[#3aadeb]" />
        </div>
      )}
      {cart && cart?.cart?.cart.length === 0 && !isLoading && <EmptyCart />}
    </>
  );
}
