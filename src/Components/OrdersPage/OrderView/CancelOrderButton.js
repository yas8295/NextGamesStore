import React, { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useMutateOrder } from "@/hooks/MongoDB/order/useMutateOrder";

export default function CancelOrderButton({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate, isLoading } = useMutateOrder(undefined, "cancel");

  const handleCancelOrder = () => {
    mutate({ order: order, method: "DELETE" });
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        disabled={isLoading}
        onClick={() => setIsModalOpen(true)}
        className={`md:text-[20px] text-[16px] min-w-28 px-4 py-2 items-center justify-center rounded-md flex border-[1.5px] border-[#ffffff] shadow-xl duration-300 bg-[#a31944] hover:opacity-80 text-white hover:text-white cursor-pointer active:scale-[0.95] disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {isLoading ? (
          <LoadingOutlined className="text-[#ffffff] md:text-[22px] text-[16px]" />
        ) : (
          "Cancel order"
        )}
      </motion.button>
      <Modal
        title="Are you sure to cancel order ?"
        open={isModalOpen}
        onOk={handleCancelOrder}
        onCancel={() => setIsModalOpen(false)}
        okText="Yes"
      >
        <div className="h-7"></div>
      </Modal>
    </>
  );
}
