import React from "react";
import { Bounce, ToastContainer } from "react-toastify";

export default function Tostify() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      toastClassName="bg-[#ffffffd4!important] backdrop-blur-sm md:text-[20px] md:min-w-[500px] min-w-[320px] text-black"
    />
  );
}
