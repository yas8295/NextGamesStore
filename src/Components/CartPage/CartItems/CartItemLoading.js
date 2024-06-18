import { Skeleton } from "antd";
import React from "react";

export default function CartItemLoading() {
  return (
    <>
      <Skeleton.Image
        active={true}
        style={{ height: "100%", width: "100%" }}
        className={`rounded object-cover sm:max-w-56 sm:min-w-56 w-full sm:h-64 h-32`}
      />
      <div className="grow flex flex-col justify-between sm:gap-3 gap-2 sm:p-7 py-5 px-2 bg-[#ffffff0b] backdrop-blur-sm">
        <Skeleton
          active={true}
          title={true}
          paragraph={{
            rows: 2,
            className: "grow flex flex-col justify-between sm:gap-20 gap-10",
          }}
        />
      </div>
    </>
  );
}
