import React, { useState } from "react";
import { Steps } from "antd";
import ShippingForm from "./Forms/ShippingForm";
import PaymentForm from "./Forms/PaymentForm";
import { useGetCart } from "@/hooks/MongoDB/cart/useGetCart";
import ConfirmedOrderReview from "./ConfirmedOrderReview/ConfirmedOrderReview";
import ErrorComponent from "@/Components/GamesSide/ErrorComponent";

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState({});
  const [shippingDetails, setShippingDetails] = useState({});

  const { data: cart, isLoading } = useGetCart();

  if (!cart && !isLoading) {
    return <ErrorComponent />;
  }

  const totalPrice =
    cart?.cart?.cart.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0) * 1.03;

  return (
    <div className="flex flex-col lg:w-9/12 md:w-10/12 w-full min-h-[550px] mx-auto md:mt-10 mt-3 md:p-8 px-2 py-4 bg-gradient-to-r from-[#005289d2] to-[#6d4262c0] rounded-xl shadow-2xl backdrop-blur-2xl overflow-hidden">
      <header className="md:text-[40px] text-[28px] text-center font-semibold md:mb-7 mb-2">
        Checkout
      </header>
      <Steps
        className="flex items-center cursor-progress"
        direction="horizontal"
        responsive={false}
        current={step}
        items={[
          {
            title: "Shipping address",
            disabled: step == 1 || step === 2 ? true : false,
          },
          {
            title: "Payment details",
            disabled: step == 0 || step === 2 ? true : false,
          },
        ]}
      />
      {step === 0 ? (
        <ShippingForm
          step={step}
          setStep={setStep}
          setShippingDetails={setShippingDetails}
        />
      ) : step === 1 ? (
        <PaymentForm
          setStep={setStep}
          totalPrice={totalPrice}
          cart={cart}
          setOrder={setOrder}
          shippingDetails={shippingDetails}
        />
      ) : (
        <ConfirmedOrderReview order={order} />
      )}
    </div>
  );
}
