import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiUser } from "react-icons/ci";
import PlatformsIcons from "../GameCard/PlatformsIcons";

export default function CategoryCard({
  id,
  name,
  games,
  games_count,
  image,
  category,
}) {
  return (
    <div
      className={`grow min-w-[300px] min-h-[300px] max-h-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative snap-start shrink-0 md:p-6 p-3 flex flex-col items-center justify-center gap-3 transition-all duration-300 group`}
    >
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b duration-1000 group-hover:opacity-100 opacity-80 from-[#0000007b] to-[#131313] group-hover:backdrop-blur-[2.5px] z-[1]"></div>
      <Image
        width={500}
        height={500}
        loading="lazy"
        placeholder="blur"
        alt={`${name}`}
        blurDataURL="media.rawg.io"
        className="absolute w-full h-full object-cover"
        src={image}
      />
      {
        <PlatformsIcons
          name={name}
          className="text-[30px] duration-300 absolute left-[-100%] top-5 group-hover:left-[14%]
      group-hover:translate-x-[-100%] font-orbitron font-extrabold text-nowrap z-20"
        />
      }
      <Link
        href={`/${category}/${id}`}
        className="text-[25px] duration-300 absolute left-4 top-4 group-hover:left-[95%]
      group-hover:translate-x-[-100%] hover:opacity-75 font-orbitron font-extrabold text-nowrap z-20"
      >
        {name}
      </Link>
      <div className="w-full mt-3 aspect-square relative z-20 after:absolute after:h-2 after:w-full after:opacity-0 after:bg-[linear-gradient(to_right,#0098FF,#7C34C8)] after:top-[80px] after:left-0 after:group-hover:opacity-100 after:translate-x-1/2 after:translate-y-1/2 after:-z-20 after:group-hover:w-full after:transition-all after:duration-300 after:group-hover:origin-right after:group-hover:-translate-x-1/2 group-hover:translate-x-1/2 transition-all duration-300">
        <div className="tooltips w-full absolute top-10 left-0 -translate-x-[150%] py-2 flex flex-col items-start gap-10 transition-all duration-300 group-hover:translate-x-[-50%] font-orbitron">
          <div className="w-full flex justify-between">
            <p className="text-[#ffffff] text-[17px] font-semibold capitalize group-hover:delay-1000 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
              Popular games
            </p>
            <p className="text-[#ffffff] text-[17px] font-semibold capitalize group-hover:delay-1000 transition-all opacity-0 group-hover:opacity-60 group-hover:transition-all group-hover:duration-500 font-sans">
              {games_count.toLocaleString()}
            </p>
          </div>
          <ul className="flex w-[100%] flex-col items-start gap-2">
            {games.slice(0, 4).map((game, i) => (
              <li
                key={game.id}
                className={`flex w-full gap-2 items-center justify-between transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500`}
                style={{ transitionDelay: `${(i + 0.5) * 0.2}s` }}
              >
                <Link
                  href={`/game/${game.id}`}
                  className="md:text-[13px] text-[11px] hover:opacity-75 duration-300 font-semibold text-[white]"
                >
                  {game.name}
                </Link>
                <p className="text-[#ffffff] font-sans group-hover:opacity-60 flex items-center gap-1">
                  {game.added.toLocaleString()}
                  <CiUser />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
