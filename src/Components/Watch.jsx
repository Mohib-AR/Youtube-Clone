import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { API_KEY } from "./constant";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { GoDownload } from "react-icons/go";
import { formatViewCount } from "./constant";
import { setClick } from "../redux/slices/appSlice";
import { formatPublishedDate } from "./constant";
import { useDispatch } from "react-redux";

export default function Search() {
  const [searchParams] = useSearchParams();

  const videoId = searchParams.get("v");
  const [iconsYt, setIcons] = useState([]);
  const [singleVideo, setSingleVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [subscribers, setSubscribers] = useState("");
  const dispatch = useDispatch();
  const getSingleVideo = async () => {
    const res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    );
    dispatch(setClick());
    setSingleVideo(res?.data?.items[0]);
  };
  const getYtIcons = async () => {
    if (singleVideo) {
      try {
        const icons = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${singleVideo?.snippet?.channelId}&key=${API_KEY}`
        );
        setSubscribers(icons.data.items[0].statistics.subscriberCount);
        setIcons(icons?.data?.items[0]?.snippet?.thumbnails?.high?.url);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const getComments = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&textFormat=plainText&part=snippet&videoId=${videoId}&maxResults=30`
      );

      setComments(res?.data?.items);
    } catch (error) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleVideo();
    getComments();
  }, []);
  useEffect(() => {
    getYtIcons();
  }, [singleVideo]);

  return (
    <>
      <div className="flex  flex-col pt-3 h-screen md:m-2  w-full text-white overflow-y-auto ">
        <div className="flex  w-full mt-16 cursor-pointer lg:pl-7">
          <div className="w-full flex flex-col">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?&autoplay=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="
          w-full
          h-[55vw] 
          xl:w-[65%] xl:h-[60vh]
          lg:w-[75%] lg:h-[60vh]
          md:w-full 
          sm:w-full
          mb-2
        "
            ></iframe>
            <h1 className="font-bold mt-2 p-2 text-lg  mb-4">
              {singleVideo?.snippet?.title}
            </h1>
            <div className=" p-3 text-[17px] md:text-base mb-14 mt-2 xl:w-[65%] lg:w-[75%]">
              <div className="flex flex-col md:flex-row justify-between ">
                <div className="flex  xl:mr-32 mb-4 md:mb-0">
                  <img
                    src={iconsYt ? iconsYt : ""}
                    className="rounded-full h-10 w-10 md:h-12 md:w-12"
                  />
                  <div className="flex flex-col ml-2">
                    <div className="w-fit font-bold ">
                      {singleVideo?.snippet?.channelTitle}
                    </div>
                    <p className="text-[#aaaaaa]">
                      {singleVideo && formatViewCount(subscribers)}
                      {singleVideo && " Subscribers"}
                    </p>
                  </div>
                  <button className="px-4 py-2 h-11 bg-white text-black font-semibold rounded-full ml-4">
                    Subscribe
                  </button>
                </div>
                <div className="flex   flex-row space-y-2 sm:space-y-0 sm:space-x-10  mt-5 space-x-3  md:space-x-3 md:mt-0 lg:justify-normal">
                  <div className="flex h-10 items-center md:h-11 mt-2 cursor-pointer bg-[#454443] px-2 md:px-3  py-1 sm:mt-0 rounded-full">
                    <AiOutlineLike size="19px" className="mr-1" />
                    <span className="text-sm font-semibold">
                      {formatViewCount(singleVideo?.statistics?.likeCount)}
                    </span>
                    <AiOutlineDislike size="19px" className="ml-2" />
                  </div>
                  <div className="flex items-center h-10 cursor-pointer md:h-11  bg-[#454443]  px-2 md:px-3  py-1 rounded-full">
                    <PiShareFatLight size="19px" className="mr-2" />
                    <span>Share</span>
                  </div>
                  <div className="flex items-center h-10 cursor-pointer md:h-11  bg-[#454443]  px-2 md:px-3  py-1 rounded-full">
                    <GoDownload className="mr-2" />
                    <span>Download</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:w-[64%] pl-2 lg:w-[73.5%] lg:ml-7  ">
          {comments?.map((comment, index) => {
            const cmnt = comment.snippet.topLevelComment.snippet;
            return (
              <div key={index}>
                <div className="flex  items-start space-x-4 mb-2 p-1 rounded-lg shadow-md">
                  <img
                    src={cmnt.authorProfileImageUrl}
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="flex-1 text-white ">
                    <div className="flex items-center space-x-2">
                      {cmnt.authorDisplayName.length > 22
                        ? `${cmnt.authorDisplayName.substring(0, 22)}...`
                        : cmnt.authorDisplayName}
                      &nbsp;&nbsp;
                      <div className="text-[#AAAAAA] text-sm">
                        {formatPublishedDate(cmnt.publishedAt)}
                      </div>
                    </div>
                    <div className="mt-2">{cmnt.textDisplay}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 pl-16 mb-3">
                  <button className="flex items-center space-x-1 text-gray-400">
                    <AiOutlineLike className="w-5 h-5" />
                    <span>{formatViewCount(cmnt.likeCount)}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-400 ">
                    <AiOutlineDislike className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
