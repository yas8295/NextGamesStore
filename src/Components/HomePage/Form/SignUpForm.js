import React, { useState } from "react";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { motion } from "framer-motion";
import { useSignup } from "@/hooks/Auth/useSignup";
import { LoadingOutlined } from "@ant-design/icons";

export default function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading } = useSignup();

  const signUp = (e) => {
    e.preventDefault();

    const userName = firstName + " " + lastName;

    mutate({ userName, email, password: password.trim() });
  };

  return (
    <motion.form
      onSubmit={(e) => signUp(e)}
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
      <div className="flex items-center md:gap-4 gap-3">
        <div className="flex min-[30%] grow flex-col">
          <label
            className="block mb-1 md:text-[13px] text-[12px] font-semibold"
            htmlFor="first"
          >
            First name
          </label>
          <Input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
            id="first"
            className="w-full md:p-3 p-2 rounded-lg bg-transparent border placeholder:opacity-50 focus:border border-gray-400 focus:outline-none text-white focus-within:text-black hover:text-black "
            placeholder="Firstname"
            prefix={
              <UserOutlined
                style={{
                  color: "#c0bebf",
                }}
              />
            }
          />
        </div>
        <div className="flex min-[30%] grow flex-col">
          <label
            className="block mb-1 md:text-[13px] text-[12px] font-semibold"
            htmlFor="last"
          >
            Last name
          </label>
          <Input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
            id="last"
            className="w-full md:p-3 p-2 rounded-lg bg-transparent border placeholder:opacity-50 focus:border border-gray-400 focus:outline-none text-white focus-within:text-black hover:text-black "
            placeholder="Lastname"
            prefix={
              <UserOutlined
                style={{
                  color: "#c0bebf",
                }}
              />
            }
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label
          className="block mb-1 md:text-[13px] text-[12px] font-semibold"
          htmlFor="email"
        >
          Email
        </label>
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          type="email"
          id="email"
          className="w-full md:p-3 p-2 rounded-lg bg-transparent border placeholder:opacity-50 focus:border border-gray-400 focus:outline-none text-white focus-within:text-black hover:text-black "
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
          className="block mb-1 md:text-[13px] text-[12px] font-semibold"
          htmlFor="password"
        >
          Password
        </label>
        <Input.Password
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          id="password"
          className="w-full md:p-3 p-2 rounded-lg bg-transparent border placeholder:opacity-50 focus:border border-gray-400 focus:outline-none text-white focus-within:text-black hover:text-black  invalid:bg-black"
          placeholder="input password"
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="bg-gradient-to-r mt-4 self-center w-44 from-[#0070d3] to-[#8f36b9] hover:from-purple-600 hover:to-[#155687] text-white font-semibold py-3 px-6 rounded-tr-xl rounded-bl-xl shadow-lg transform transition duration-500 ease-in-out capitalize font-orbitron md:text-[17px] text-[14px] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <LoadingOutlined className="text-[23px] text-[#ffffff]" />
        ) : (
          "Sign Up"
        )}
      </button>
    </motion.form>
  );
}
