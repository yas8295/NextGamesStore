import { ConfigProvider } from "antd";
import React from "react";

export default function AntThemes({ children }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Skeleton: {
            gradientFromColor: "#2a2a2a9e",
          },
          Segmented: {
            itemHoverBg: "white",
            colorTextDisabled: "#c5c5c5",
            itemPadding: "10px",
            itemActiveBg: "#c5c5c5",
          },
          Select: {
            colorText: "black",
            colorBorder: "transparent",
            colorTextPlaceholder: "#c5c5c5",
            selectorBg: "transparent",
          },
          Drawer: {
            colorIcon: "white",
            colorText: "white",
          },
          Input: {
            colorTextPlaceholder: "#c5c5c5",
            fontSizeIcon: "18px",
          },
          Empty: {
            colorTextDescription: "#c5c5c5",
            opacityImage: "0.4",
          },
          Steps: {
            colorText: "white",
            colorTextLabel: "white",
            colorTextDisabled: "rgba(0, 0, 0, 0.25)",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
