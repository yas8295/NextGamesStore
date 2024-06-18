import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import OrderReview from "../OrderReview/OrderReview";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoCopySharp } from "react-icons/io5";
import { Tooltip } from "antd";
import CheckoutFormButton from "./CheckoutFormButton";
import { LoadingOutlined } from "@ant-design/icons";
import { useMutateOrder } from "@/hooks/MongoDB/order/useMutateOrder";
import { v4 as uuidv4 } from "uuid";
import { addDays } from "date-fns";

const stripePromise = async () => {
  try {
    const stripe = await loadStripe(
      `pk_test_51PD88LIfzKzi4uREtrdbCDsNcZZgieWx6PqpWHcelKUUn63dKGMm7zdGEInK85H2eRw3spq6o58qemr3ksUgKbEG00d3uTyMte`
    );
    return stripe;
  } catch (error) {
    console.log(error);
  }
};

export default function PaymentForm({
  setStep,
  totalPrice,
  cart,
  setOrder,
  shippingDetails,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { mutate, isLoading } = useMutateOrder(setStep);

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      console.log(error);
      setLoading(false);
      return;
    } else {
      setError(false);
      const order = {
        items: cart.cart.cart.map((game) => ({
          gameId: game.gameId,
          quantity: game.quantity,
          amount: game.price * game.quantity,
        })),
        total: totalPrice,
        date: Date.now(),
        reference: uuidv4(),
        shippingDetails: shippingDetails,
        deliveryDate: addDays(new Date(), 2),
        status: "pending",
      };

      setOrder(order);
      mutate({ order, method: "POST" });
    }

    setLoading(false);
  };

  return (
    <>
      <h1 className="self-start mt-5 md:mb-2 mb-1 md:text-[22px] text-[17px]">
        Order summary
      </h1>
      <OrderReview />
      <header className="self-start mb-5 md:text-[22px] text-[19px] font-semibold">
        Payment method
      </header>
      <Elements
        stripe={stripePromise()}
        options={{ appearance: { theme: "flat" } }}
      >
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement
                options={{
                  style: {
                    base: {
                      color: `white`,
                      "::placeholder": {
                        color: `#c8c8c8`,
                      },
                      iconColor: `white`,
                      fontSize: "20px",
                    },
                  },
                }}
              />
              {error && (
                <h1 className="mt-3 text-red-400 font-semibold">⛔ {error}</h1>
              )}
              <h1 className="mt-3 opacity-85 flex items-center gap-3">
                <span className="text-[#ff7b00] font-semibold">
                  Test card: <span className="underline">4242424242424242</span>
                </span>
                <CopyToClipboard text={4242424242424242}>
                  <Tooltip title="Copy">
                    <IoCopySharp className="cursor-copy text-[18px]" />
                  </Tooltip>
                </CopyToClipboard>
              </h1>
              <h1 className="opacity-85 flex items-center gap-3">
                <span className="text-[#ff7b00] font-semibold">
                  Postode: <span className="underline">45454</span>
                </span>
                <CopyToClipboard text={45454}>
                  <Tooltip title="Copy">
                    <IoCopySharp className="cursor-copy text-[18px]" />
                  </Tooltip>
                </CopyToClipboard>
              </h1>
              <div className="grow w-full flex gap-3 justify-between mt-5 self-end">
                <CheckoutFormButton
                  disabled={loading || isLoading}
                  dir="back"
                  onClick={() => setStep((step) => step - 1)}
                >
                  Back
                </CheckoutFormButton>
                <CheckoutFormButton disabled={loading || isLoading}>
                  {loading || isLoading ? (
                    <LoadingOutlined className="text-[#3aadeb] text-[15px]" />
                  ) : (
                    `pay $${totalPrice ? totalPrice.toFixed(2) : 0}`
                  )}
                </CheckoutFormButton>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
}
