import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { imgSrc1 } from "./constant";
import { useDispatch } from "react-redux";
import { toggleSidebar, setCategory } from "../redux/slices/appSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  function toggleHandler() {
    dispatch(toggleSidebar());
  }
  const handleSearchClick = () => {
    dispatch(setCategory(value));
    setValue("");
    navigate("/");
  };

  return (
    <>
      <div className="flex  fixed z-50 bg-black top-0 right-0 left-0 w-full pt-3 h-14 space-x-2 md:space-x-10 lg:space-x-0">
        <div className="flex pl-3 w-[35vw] md:w-[25vw] space-x-2 lg:space-x-3 pt-2  lg:mr-20">
          <div>
            <GiHamburgerMenu
              onClick={toggleHandler}
              className="w-4 mt-1 lg:mt-0 xl:w-14 h-4 xl:h-6"
              color="white"
            />
          </div>
          <div>
            <img
              src="/src/assets/youtube.png"
              className="w-24 mt-1 lg:mt-0 lg:w-[7rem]"
              alt=""
            />
          </div>
        </div>
        <div className="flex w-[60vw]">
          <div className="flex w-full">
            <input
              type="text"
              value={value}
              className={`text-white w-[60vw] lg:w-[50vw] xl:w-[45vw] font-light  md:px-6 h-9 xl:h-11 rounded-full rounded-r-none bg-transparent border border-gray-100/30`}
              placeholder="Search"
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="bg-[#222222] w-8 h-9 pl-1 md:h-[2.4rem] md:w-10 xl:h-[2.8rem] xl:pt-1 xl:pl-2 xl:w-16 rounded-full rounded-l-none   ">
              <IoSearchOutline
                color="white"
                className="w-5 lg:w-8 h-7 mt-1 xl:mt-0 xl:h-9"
                onClick={() => {
                  handleSearchClick();
                }}
              />
            </div>
            <div className="hidden md:inline-block  bg-[#222222] rounded-full ml-4 h-9 lg:h-10 xl:h-11  w-9 md:pl-2 lg:pl-1  xl:w-11 pt-2 lg:pt-2 xl:pl-[0.5rem] ">
              <FaMicrophone
                color="white"
                className="w-4 hidden mb-9 md:inline-block h-5 lg:w-7 lg:h-5 xl:h-6 "
              />
            </div>
          </div>
        </div>
        <div className="flex  space-x-1 md:mt-1  lg:space-x-8 lg:mr-7 xl:mr-3">
          <img
            src={imgSrc1}
            className="w-6 h-6 mt-1 md:mt-0 md:w-7 md:h-7  bg-transparent invert pt-2"
            alt=""
          />
          <img
            src="/src/assets/MohibImg1.jpeg"
            className="h-7 bg-contain w-8 mt-[0.3rem] lg:mt-0  rounded-full lg:h-10 lg:w-[2.7rem]"
          />
        </div>
      </div>
      <Outlet></Outlet>
    </>
  );
}