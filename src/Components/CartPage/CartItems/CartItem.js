import { useGetGame } from "@/hooks/AllGamesHooks/useGetGame";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import CartDeleteGameButton from "../../GameCard/CartButtons/CartDeleteGameButton";
import PlatformsIcons from "../../GameCard/PlatformsIcons";
import CartOperationButtons from "../../GameCard/CartButtons/CartOperationButtons";
import { useRouter } from "next/router";
import CartItemLoading from "./CartItemLoading";

export default function CartItem({ id, quantity, price }) {
  const { push } = useRouter();
  const { data, isLoading } = useGetGame(id);

  if (!data || isLoading) {
    return <CartItemLoading />;
  }

  const itemPrice = quantity * price;

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        viewport={{ once: true }}
      >
        <Image
          src={data?.background_image}
          alt={data?.name}
          width={300}
          height={260}
          className={`rounded object-cover sm:max-w-56 sm:min-w-56 w-full sm:h-64`}
        />
      </motion.div>
      <div className="grow flex flex-col justify-between sm:gap-3 gap-2 sm:p-7 py-5 px-2 bg-[#373737a7] backdrop-blur-lg">
        <div className="grow flex flex-col gap-2">
          <div className="flex justify-between items-start gap-2">
            <motion.h1
              onClick={() => {
                push(`/game/${id}`);
              }}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.3 }}
              className={`duration-300 font-orbitron font-semibold md:text-[23px] text-[19px] text-wrap hover:text-[gray] cursor-pointer w-fit text-ellipsis`}
            >
              {data?.name}
            </motion.h1>
            <CartDeleteGameButton
              game={{ id, image: data?.background_image, name: data?.name }}
            />
          </div>
          <div className="flex items-center gap-[3px]">
            {data?.platforms?.slice(0, 3).map((p, i) => (
              <motion.h1
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  delay: i * 0.2 + 0.5,
                }}
                viewport={{ once: true }}
                className="md:text-[22px] text-[18px]"
                key={p.platform.name}
              >
                <PlatformsIcons name={p.platform.name} />
              </motion.h1>
            ))}
          </div>
          <h1 className="text-[20px] font-bold text-[#52a3fff4] md:self-start self-center">
            ${itemPrice.toFixed(2)}
          </h1>
        </div>
        <div className="md:self-start self-center">
          <CartOperationButtons
            key={id}
            game={{ id, image: data?.background_image, name: data?.name }}
            id={id}
            itemPrice={itemPrice}
            quantity={quantity}
          />
        </div>
      </div>
    </>
  );
}
