import React, { useState } from "react";
import { sidebarNames } from "./constant";
import { useSelector } from "react-redux";
export default function Sidebar() {
  const open = useSelector((store) => store.app.open);
  const [active, setActive] = useState(0);
  function handleClick() {}
  return (
    <>
      <div
        className={`overflow-y-auto ${
          open ? "" : "w-16"
        } transition-all duration-300 fixed left-0 overflow-x-hidden bg-[#0f0f0f]  text-white font-[Roboto] h-screen`}
      >
        <div className="flex flex-col space-y-6 pl-6 ">
          {sidebarNames.map((Icons, index) => {
            return (
              <div key={index}>
                {Icons.explore ? (
                  <div className="text-base font-bold mb-5 ">Explore</div>
                ) : null}
                <div
                  className={`flex h-10 space-x-5 hover:bg-[#272727] transition-colors duration-700 ${
                    active == index ? "bg-[#272727] " : ""
                  } 
                  } cursor-pointer`}
                  onClick={() => setActive(index)}
                >
                  <Icons.IconName className="w-6 h-6 " />
                  {open ? <span>{Icons.title}</span> : null}
                </div>
                {Icons.hr ? (
                  <hr className="mt-6" style={{ borderColor: "#3f3f3f" }} />
                ) : null}
              </div>
            );
          })}
        </div>
        <div
          className={`${
            open ? "" : "hidden"
          } text-[14px]  font-semibold  text-[#A1A1A1] mt-6  pl-4 `}
        >
          <div className="flex space-x-1">
            <span>About</span>
            <span>Press</span>
            <span>Copyright</span>
          </div>
          <div
            className="flex space-x-1
          "
          >
            <span>Contact us</span>
            <span>Creator</span>
            <span>Advertise</span>
          </div>
          <div>Developers</div>
          <div className="flex space-x-1">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Policy & Safety</span>
          </div>
          <div>
            <span>How Youtube Works</span>
          </div>
          <div>
            <span>Test new features</span>
          </div>
          <div className="text-[#717171] text-sm pt-3 mb-24">
            <span>© 2024 Google LLC</span>
          </div>
        </div>
      </div>
    </>
  );
}
