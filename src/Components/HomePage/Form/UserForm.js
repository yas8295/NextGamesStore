import React, { useState } from "react";
import { Segmented } from "antd";
import SigninForm from "./SigninForm";
import SignUpForm from "./SignUpForm";
import { AnimatePresence } from "framer-motion";

export default function UserForm() {
  const [form, setForm] = useState("signin");

  return (
    <div
      className="xl:w-5/12 lg:w-7/12 md:w-8/12 sm:w-10/12 w-full self-stretch animate-[gradient_5s_ease_infinite] border-4 border-transparent md:p-6 p-3 flex flex-col gap-4 rounded-2xl bg-[200%_100%] backdrop-blur-[10px] overflow-hidden min-h-[450px]"
      style={{
        background:
          "linear-gradient(#989898b8, #0c0b0b) padding-box,linear-gradient(145deg,transparent 35%,#e81cff,#40c9ff) border-box",
        backgroundSize: "200%100%",
        boxShadow: "box-shadow:7px 7px 10px 3px #24004628",
      }}
    >
      <Segmented
        defaultValue="signin"
        className="flex w-fit self-center items-center text-white font-semibold p-1 relative border-[2px] border-[#3b6ec6] overflow-hidden bg-[#ffffff1d] rounded-lg shadow-md before:w-24 before:h-24 before:left-16 before:top-[-70px] before:absolute before:bg-[#e682f5af] before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-[#2ddcffb4]  after:rounded-full after:-z-10 after:blur-xl after:top-12 after:-right-5"
        size="large"
        options={[
          {
            label: "Sign In",
            value: "signin",
          },
          {
            label: "Sign Up",
            value: "signup",
          },
        ]}
        onChange={(value) => {
          setForm(value);
        }}
      />
      <AnimatePresence mode="wait">
        {form === "signin" && <SigninForm />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {form === "signup" && <SignUpForm />}
      </AnimatePresence>
    </div>
  );
}
