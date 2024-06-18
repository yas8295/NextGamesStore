import React from "react";
import SkeletonComponent from "./SkeletonComponent.js";

export default function LoadingGamesComponent({ layOut }) {
  return (
    <>
      <div
        className={`flex items-center justify-center ${
          layOut && "flex-col"
        } duration-700 w-full flex-wrap gap-5 grow mt-5`}
      >
        {Array.from({ length: 6 }, (e, i) => (
          <SkeletonComponent key={i} layOut={layOut}></SkeletonComponent>
        ))}
      </div>
    </>
  );
}
