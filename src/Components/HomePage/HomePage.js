import React from "react";
import { motion } from "framer-motion";
import UserForm from "./Form/UserForm";

export default function HomePage() {
  return (
    <motion.div className="min-h-screen w-screen flex items-center justify-center font-orbitron md:p-10 p-2">
      <motion.video
        initial={{ opacity: 0, y: 10, x: -20 }}
        animate={{
          y: 0,
          x: 0,
          transition: {
            y: {
              duration: 2,
            },
            x: {
              duration: 2,
            },
          },
        }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
        }}
        autoPlay
        loop
        muted
        playsInline
        id="bg-video"
        className="min-h-screen object-cover object-bottom fixed z-[-1] min-w-screen"
      >
        <source
          src="/girl-in-the-rain-cyberpunk-2077.1920x1080.mp4"
          type="video/mp4"
        />
      </motion.video>
      <div className="flex justify-center items-center w-full md:min-h-[455px]">
        <UserForm />
      </div>
    </motion.div>
  );
}
