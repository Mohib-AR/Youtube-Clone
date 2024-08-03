import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
export default function Feed() {
  return (
    <>
      <div className="flex flex-col w-full h-screen z-50">
        <div className=" w-[calc(100vw-15rem)] ">
          <ButtonList />
        </div>
        <div className="mt-16 overflow-y-auto  h-full lg:mr-2">
          <VideoContainer />
        </div>
      </div>
    </>
  );
}
