import React, { useEffect, useState } from "react";
import SideBarLink from "./SideBarLink";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import Image from "next/image";
import { LoadingOutlined } from "@ant-design/icons";

export default function GenresLinks({ open, toggleOpen }) {
  const [genres, setGenres] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/getGenres");
        const genres = await res.json();
        setGenres(genres);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGenres();
  }, []);

  if (!genres) {
    return (
      <div className="w-full flex justify-center items-center">
        <LoadingOutlined className="text-[40px] text-[#3aadeb]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {genres?.genres?.results?.slice(0, 4).map((genre) => (
        <SideBarLink
          key={genre.id}
          open={open}
          toggleOpen={toggleOpen}
          href={`/genres/${genre.id}`}
        >
          <Image
            width={70}
            height={70}
            loading="lazy"
            placeholder="blur"
            alt={`${name}`}
            blurDataURL="media.rawg.io"
            src={genre.image_background}
            className="w-[35px] h-[35px] object-cover rounded-lg"
          />
          {genre.name}
        </SideBarLink>
      ))}
      {show &&
        genres?.genres?.results?.slice(4, -1).map((genre) => (
          <SideBarLink
            key={genre.id}
            open={open}
            toggleOpen={toggleOpen}
            href={`/genres/${genre.id}`}
          >
            <Image
              width={70}
              height={70}
              loading="lazy"
              placeholder="blur"
              alt={`${name}`}
              blurDataURL="media.rawg.io"
              src={genre.image_background}
              className="w-[35px] h-[35px] object-cover rounded-lg"
            />
            {genre.name}
          </SideBarLink>
        ))}
      <motion.button
        layout
        transition={{ type: "spring", stiffness: 100 }}
        onClick={() => {
          setShow(!show);
        }}
        className="group flex items-center gap-3 text-[18px] opacity-70 hover:opacity-100"
      >
        <IoIosArrowDown
          className={`bg-[#303030] group-hover:bg-[#828282] group-hover:text-black  w-9 h-9 p-[7px] duration-300 rounded-md ${
            show && "rotate-180"
          }`}
        />
        {show ? "Hide" : "Show all"}
      </motion.button>
    </div>
  );
}
