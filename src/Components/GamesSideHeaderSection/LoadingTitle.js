import React from "react";
import { Skeleton } from "antd";

export default function LoadingTitle() {
  return (
    <Skeleton.Input
      className="self-center grow"
      active={true}
      size="large"
      block={true}
    />
  );
}
