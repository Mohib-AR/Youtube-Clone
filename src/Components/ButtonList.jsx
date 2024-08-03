import React, { useState } from "react";
import { useSelector } from "react-redux";
import { buttonList } from "./constant.js";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/appSlice.js";
export default function ButtonList() {
  const open = useSelector((store) => store.app.open);
  const category = useSelector((store) => store.app.category);

  const dispatch = useDispatch();
  const setCategoryState = (button) => {
    if (category !== button) {
      dispatch(setCategory(button));
    }
  };

  return (
    <>
      <div
        className={`flex w-full ${
          open ? "lg:w-[calc(100vw-15rem)]" : "lg:w-[calc(100vw-5rem)]"
        } fixed  justify-between text-[#F1F1F1] text-[12px] lg:text-[14px] no-scrollbar font-bold  whitespace-nowrap overflow-x-scroll space-x-4`}
      >
        {buttonList.map((button, index) => {
          return (
            <div key={index}>
              <button
                value={button}
                onClick={() => setCategoryState(button)}
                className={`${
                  category === button ? "bg-white text-black" : ""
                } bg-[#272727] px-4 py-3 rounded transition-colors duration-700`}
              >
                {button}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
