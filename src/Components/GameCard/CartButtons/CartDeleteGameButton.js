import { useMutateCart } from "@/hooks/MongoDB/cart/useMutateCart";
import { Button, Tooltip } from "antd";
import React from "react";
import { MdDeleteForever } from "react-icons/md";

export default function CartDeleteGameButton({ game }) {
  const { mutate, isLoading } = useMutateCart();

  return (
    <Tooltip title="Delete">
      <Button
        onClick={() => {
          mutate({ game, method: "DELETE" });
        }}
        style={{
          backgroundColor: "#de0e4f",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
        }}
        danger
        size="middle"
        type="primary"
        shape="default"
        disabled={isLoading}
        loading={isLoading}
        icon={<MdDeleteForever className="text-[19px]" />}
      />
    </Tooltip>
  );
}
