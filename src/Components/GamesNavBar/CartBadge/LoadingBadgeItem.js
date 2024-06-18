import { Skeleton } from "antd";
import React from "react";

export default function LoadingBadgeItem() {
  return (
    <div className="w-full h-full flex items-center gap-3">
      <Skeleton.Image
        active={true}
        style={{ height: "100%", width: "100%" }}
        className={`duration-300 rounded-lg object-cover min-w-16 w-16 h-16`}
      />
      <Skeleton
        active={true}
        title={false}
        paragraph={{
          rows: 2,
          className: "grow flex flex-col justify-between",
        }}
      />
    </div>
  );
}
