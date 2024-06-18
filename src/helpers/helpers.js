import { addWeeks, formatISO, getYear, subMonths } from "date-fns";
import { PiWindowsLogoFill } from "react-icons/pi";
import { FaPlaystation } from "react-icons/fa";
import { FaXbox } from "react-icons/fa6";
import { BsNintendoSwitch } from "react-icons/bs";
import { FaApple } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
import { FaLinux } from "react-icons/fa";
import { SiWii } from "react-icons/si";
import { SiAtari } from "react-icons/si";
import { SiSega } from "react-icons/si";
import { FaGamepad } from "react-icons/fa";

export const last30daysDates = `${formatISO(subMonths(new Date(), 1), {
  representation: "date",
})},${formatISO(new Date(), {
  representation: "date",
})}`;

export const thisWeek = `${formatISO(new Date(), {
  representation: "date",
})},${formatISO(addWeeks(new Date(), 1), {
  representation: "date",
})}`;

export const nextWeek = `${formatISO(new Date(), {
  representation: "date",
})},${formatISO(addWeeks(new Date(), 2), {
  representation: "date",
})}`;

export const getMonth = (month) => {
  const year = getYear(new Date());
  const Month = `${formatISO(new Date(year, month, 1), {
    representation: "date",
  })},${formatISO(new Date(year, month, 31), {
    representation: "date",
  })}`;

  return Month;
};

export const getBestOfYear = `${formatISO(new Date(getYear(new Date()), 0, 1), {
  representation: "date",
})},${formatISO(new Date(getYear(new Date()), 11, 31), {
  representation: "date",
})}`;

export const getBestOfLastYear = `${formatISO(
  new Date(getYear(new Date()) - 1, 0, 1),
  {
    representation: "date",
  }
)},${formatISO(new Date(getYear(new Date()) - 1, 11, 31), {
  representation: "date",
})}`;

export const icon = (name, className) => {
  switch (name) {
    case "PC":
      return <PiWindowsLogoFill className={className} />;
    case `Play`:
      return <FaPlaystation className={className} />;
    case `PSP`:
      return <FaPlaystation className={className} />;
    case `PS Vita`:
      return <FaPlaystation className={className} />;
    case `Xbox`:
      return <FaXbox className={className} />;
    case `Nint`:
      return <BsNintendoSwitch className={className} />;
    case `iOS`:
      return <FaApple className={className} />;
    case `macOS`:
      return <FaApple className={className} />;
    case `Apple II`:
      return <FaApple className={className} />;
    case `Android`:
      return <IoLogoAndroid className={className} />;
    case `Linux`:
      return <FaLinux className={className} />;
    case `Wii`:
      return <SiWii className={className} />;
    case `Wii U`:
      return <SiWii className={className} />;
    case `Atar`:
      return <SiAtari className={className} />;
    case `SEGA`:
      return <SiSega className={className} />;
    default:
      return <FaGamepad className={className} />;
  }
};
