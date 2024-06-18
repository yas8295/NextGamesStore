import React, { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { motion } from "framer-motion";
import { useSignin } from "@/hooks/Auth/useSignin";
import { LoadingOutlined } from "@ant-design/icons";

export default function SigninForm() {
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("123456");

  const { mutate, isLoading } = useSignin();

  const signin = async (e) => {
    e.preventDefault();

    mutate({ email, password: password.trim() });
  };

  return (
    <motion.form
      onSubmit={(e) => signin(e)}
      initial={{ opacity: 0, height: 0, y: 100 }}
      animate={{
        opacity: 1,
        height: "fit-content",
        y: 0,
        transition: { duration: 0.5, delay: 0.5 },
      }}
      exit={{
        y: 100,
        opacity: 0,
      }}
      className="grow flex flex-col gap-3"
    >
      <div className="flex flex-col">
        <label
          className="block md:text-[13px] text-[12px] mb-1 font-semibold"
          htmlFor="email"
        >
          Email
        </label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
          type="email"
          id="email"
          className="w-full md:p-3 p-2 rounded-lg bg-transparent border placeholder:opacity-50 focus:border border-gray-400 text-white focus-within:text-black hover:text-black focus:outline-none invalid:text-[red!important]"
          placeholder="Enter your email"
          prefix={
            <MailOutlined
              style={{
                color: "#c0bebf",
              }}
            />
          }
        />
      </div>
      <div className="flex flex-col">
        <label
          className="block md:text-[13px] text-[12px] mb-1 font-semibold"
          htmlFor="password"
        >
          Password
        </label>
        <Input.Password
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          defaultValue={password}
          required
          id="password"
          className="w-full md:p-3 p-2 rounded-lg bg-transparent border placeholder:opacity-50 focus:border border-gray-400 text-white focus-within:text-black hover:text-black focus:outline-none"
          placeholder="input password"
        />
        <p className="md:text-[14px] text-[12px] font-semibold font-sans mt-2 text-[#ff8b32]">
          Test pass: 123456
        </p>
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="bg-gradient-to-r mt-3 self-center w-44 from-[#0070d3] to-[#8f36b9] hover:from-purple-600 hover:to-[#155687] text-white font-semibold py-3 px-6 rounded-tr-xl rounded-bl-xl shadow-lg transform transition duration-500 ease-in-out capitalize font-orbitron md:text-[17px] text-[14px] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <LoadingOutlined className="text-[23px] text-[#ffffff]" />
        ) : (
          "Sign In"
        )}
      </button>
    </motion.form>
  );
}
