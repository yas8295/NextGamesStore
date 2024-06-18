import React from "react";
import CheckoutFormButton from "./CheckoutFormButton";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function ShippingForm({ step, setStep, setShippingDetails }) {
  const { push } = useRouter();

  const { data: session, status } = useSession();
  const username = session?.user.name.split(" ");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const shippingDetails = {
      name: `${formData.get("first")} ${formData.get("last")}`,
      address: formData.get("address"),
      email: formData.get("email"),
      city: formData.get("city"),
    };

    setShippingDetails(shippingDetails);

    setStep(step + 1);
  };

  return (
    <>
      <h1 className="self-start mt-5 md:mb-2 mb-1 md:text-[22px] text-[17px]">
        Shipping address
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col md:gap-8 gap-5 mt-5"
      >
        <div className="flex md:flex-row flex-col md:gap-10 gap-5">
          <div className="relative grow">
            <input
              defaultValue={(status !== "loading" && username[0]) || ""}
              placeholder="First name"
              className="peer h-10 text-[18px] w-full border-b-2 border-[#7fcaff7d] text-[#ffffffb6] bg-transparent placeholder-transparent focus:outline-none focus:border-[#62b0ff]"
              required
              id="first"
              name="first"
              type="text"
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#62b0ff] peer-focus:text-sm peer-valid:text-white"
              htmlFor="first"
            >
              First name*
            </label>
          </div>
          <div className="relative grow">
            <input
              defaultValue={(status !== "loading" && username[1]) || ""}
              placeholder="last name"
              className="peer h-10 text-[18px] w-full border-b-2 border-[#7fcaff7d] text-[#ffffffb6] bg-transparent placeholder-transparent focus:outline-none focus:border-[#62b0ff]"
              required
              id="last"
              name="last"
              type="text"
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#62b0ff] peer-focus:text-sm peer-valid:text-white"
              htmlFor="last"
            >
              Last name*
            </label>
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:gap-10 gap-5">
          <div className="relative grow">
            <input
              defaultValue={"ismailia"}
              placeholder="address"
              className="peer h-10 text-[18px] w-full border-b-2 border-[#7fcaff7d] text-[#ffffffb6] bg-transparent placeholder-transparent focus:outline-none focus:border-[#62b0ff]"
              required
              id="address"
              name="address"
              type="text"
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#62b0ff] peer-focus:text-sm peer-valid:text-white"
              htmlFor="address"
            >
              Address line*
            </label>
          </div>
          <div className="relative grow">
            <input
              defaultValue={(status !== "loading" && session.user.email) || ""}
              placeholder="email"
              className="peer h-10 text-[18px] w-full border-b-2 border-[#7fcaff7d] text-[#ffffffb6] bg-transparent placeholder-transparent focus:outline-none focus:border-[#62b0ff]"
              required
              id="email"
              name="email"
              type="email"
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#62b0ff] peer-focus:text-sm peer-valid:text-white"
              htmlFor="email"
            >
              Email*
            </label>
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:gap-10 gap-5">
          <div className="relative grow">
            <input
              defaultValue={"ismailia"}
              placeholder="city"
              className="peer h-10 text-[18px] w-full border-b-2 border-[#7fcaff7d] text-[#ffffffb6] bg-transparent placeholder-transparent focus:outline-none focus:border-[#62b0ff]"
              required
              id="city"
              name="city"
              type="text"
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#62b0ff] peer-focus:text-sm peer-valid:text-white"
              htmlFor="city"
            >
              City*
            </label>
          </div>
          <div className="relative grow">
            <input
              defaultValue={"45454"}
              placeholder="postal code"
              className="peer h-10 text-[18px] w-full border-b-2 border-[#7fcaff7d] text-[#ffffffb6] bg-transparent placeholder-transparent focus:outline-none focus:border-[#62b0ff]"
              required
              id="postal code"
              name="postal code"
              type="text"
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#62b0ff] peer-focus:text-sm peer-valid:text-white"
              htmlFor="postal code"
            >
              Zip / Postal code*
            </label>
          </div>
        </div>
        <div className="grow w-full flex gap-3 justify-between mt-5 self-end">
          <CheckoutFormButton dir="back" onClick={() => push("/cart")}>
            Back to cart
          </CheckoutFormButton>
          <CheckoutFormButton step={step}>Next</CheckoutFormButton>
        </div>
      </form>
    </>
  );
}
