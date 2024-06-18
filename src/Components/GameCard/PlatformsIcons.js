import { icon } from "@/helpers/helpers";
import React from "react";

export default function PlatformsIcons({ name, className }) {
  return icon(
    name.slice(0, 4) === "Play"
      ? name.slice(0, 4)
      : name.slice(0, 4) === "Xbox"
      ? name.slice(0, 4)
      : name.slice(0, 4) === "Nint"
      ? name.slice(0, 4)
      : name.slice(0, 4) === "Atar"
      ? name.slice(0, 4)
      : name.slice(0, 4) === "SEGA"
      ? name.slice(0, 4)
      : name,
    className
  );
}
