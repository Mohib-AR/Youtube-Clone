import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import { useSelector } from "react-redux";
export default function Home() {
  const open = useSelector((store) => store.app.open);

  return (
    <div className="flex  h-screen pt-[4.5rem]">
      <div
        className={`${
          open ? "z-50 md:inline-block" : "hidden"
        } lg:inline-block ${
          open ? "lg:w-60" : "lg:w-20"
        }  transition-all duration-300`}
      >
        <Sidebar></Sidebar>
      </div>
      <div className={`flex-1 h-screen overflow-hidden`}>
        <Feed />
      </div>
    </div>
  );
}
