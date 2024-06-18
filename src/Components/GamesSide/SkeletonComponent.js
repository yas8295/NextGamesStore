import React from "react";
import { Skeleton } from "antd";

export default function SkeletonComponent({ layOut }) {
  return (
    <div
      className={`${
        layOut && "w-[80%]"
      } p-[1.5px] grow rounded-[0px_15px] border-[double_1px_transparent] w-80 bg-[linear-gradient(to_right,#0098FF,#7C34C8)] overflow-hidden`}
      style={{
        backgroundOrigin: "border-box",
        backgroundClip: "border-box",
      }}
    >
      <div className="flex flex-col rounded-[0px_15px] w-full h-full backdrop-blur-lg bg-[rgb(20,20,20)] overflow-hidden">
        <Skeleton.Image
          active
          className="grow"
          style={{ width: "100%", height: "300px" }}
        />
        <Skeleton
          className="mt-2 h-[50%] p-5"
          paragraph={{ rows: 3, width: "100%" }}
          active
        />
      </div>
    </div>
  );
}
