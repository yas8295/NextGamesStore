import { Avatar, Popover } from "antd";
import { useSession } from "next-auth/react";
import React from "react";
import { SlLogout } from "react-icons/sl";
import { LoadingOutlined } from "@ant-design/icons";
import { useSignout } from "@/hooks/Auth/useSignout";
import Link from "next/link";

export default function UserBadge() {
  const { data: session, status } = useSession();
  const username = session?.user.name.split(" ");

  const { mutate, isLoading } = useSignout();

  return (
    session && (
      <Popover
        trigger="click"
        className="cursor-pointer"
        title={
          <h1 className="md:text-[20px] text-[17px] capitalize">
            👤 {`${username?.[0]} ${username?.[1]}`}
          </h1>
        }
        arrow={false}
        rootClassName="max-h-[300px] min-w-[250px] md:max-w-full max-w-[280px] overflow-auto rounded-xl backdrop-blur-lg"
        placement="bottomLeft"
        content={
          <div className="w-full flex flex-col gap-1 p-1">
            <Link href={"/cart"} className="md:text-[20px]">
              Cart
            </Link>
            <Link href={"/wishlist"} className="md:text-[20px]">
              Wishlist
            </Link>
            <Link href={"/orders"} className="md:text-[20px]">
              Orders
            </Link>

            <button
              disabled={isLoading}
              onClick={() => mutate()}
              className="cursor-pointer hover:text-[#00a6ff] duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-2 ">
                <h1 className="md:text-[20px]">Logout</h1>
                {isLoading ? (
                  <LoadingOutlined className="md:text-[30px] text-[20px]" />
                ) : (
                  <SlLogout className="md:text-[30px] text-[20px]" />
                )}
              </div>
            </button>
          </div>
        }
      >
        <Avatar
          size={42}
          style={{
            background:
              "linear-gradient(90deg, rgba(0,170,255,1) 0%, rgba(81,49,255,1) 100%)",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
          }}
          className="uppercase"
        >
          <h1 className="flex gap-[2px]">
            <span>{status !== "loading" && username?.[0][0]}</span>
            <span>{status !== "loading" && username?.[1][0]}</span>
          </h1>
        </Avatar>
      </Popover>
    )
  );
}
