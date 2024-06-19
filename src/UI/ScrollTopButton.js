import { useEffect, useRef } from "react";

export default function ScrollTopButton() {
  const ref = useRef();
  useEffect(function () {
    const scrollSide = document.querySelector(".games-side");
    scrollSide.addEventListener("scroll", (e) => {
      if (e.target.scrollTop > 500) {
        ref.current.classList.add("show");
      } else {
        ref.current.classList.remove("show");
      }
    });
  }, []);

  return (
    <div
      ref={ref}
      className="flex justify-center items-center fixed sm:right-[60px] sm:bottom-[20px] right-[10px] bottom-[60px] sm:w-[50px] sm:h-[50px] w-[35px] h-[35px] z-[9999999] duration-1000"
      style={{ opacity: 0, scale: 0 }}
    >
      <a
        onClick={() => {
          const scrollSide = document.querySelector(".games-side");
          scrollSide.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
        className="group sm:w-[50px] sm:h-[50px] w-[35px] h-[35px] absolute rounded-full dark:bg-[rgb(20,20,20)] bg-[#ffffffc8] font-semibold flex justify-center items-center dark:shadow-[0px_0px_0px_4px_rgba(255,255,255,0.253)] shadow-[0px_0px_0px_4px_#95beff] cursor-pointer duration-300 overflow-hidden  hover:sm:w-[140px] hover:w-[90px] hover:rounded-[50px] hover:duration-300 dark:hover:bg-[rgba(131,131,131,0.61)] hover:bg-[#95beffc2] hover:backdrop-blur-lg hover:items-center before:absolute before:bottom-[-20px] before:content-['Back_to_top'] before:text-white before:text-[0px] hover:before:sm:text-[16px] hover:before:text-[12px] hover:before:opacity-[1] hover:before:bottom-[unset] hover:before:duration-300"
      >
        <svg
          className="sm:w-[12px] w-[10px] duration-300 group-hover:translate-y-[-200%]"
          fill={"white"}
          viewBox="0 0 384 512"
        >
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
        </svg>
      </a>
    </div>
  );
}
