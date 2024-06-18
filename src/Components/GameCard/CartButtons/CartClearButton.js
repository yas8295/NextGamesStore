import { useMutateCart } from "@/hooks/MongoDB/cart/useMutateCart";
import { Button, Tooltip } from "antd";
import React from "react";
import { BsCartX } from "react-icons/bs";

export default function CartClearButton() {
  const { mutate, isLoading } = useMutateCart();

  return (
    <Tooltip title="Clear cart">
      <Button
        onClick={() => {
          mutate({ method: "DELETE", operation: "ALL" });
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
        icon={<BsCartX className="text-[20px]" />}
      />
    </Tooltip>
  );
}
