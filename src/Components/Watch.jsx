import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { API_KEY } from "./constant";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { GoDownload } from "react-icons/go";
import { formatViewCount } from "./constant";
import { formatPublishedDate } from "./constant";
export default function Search() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [iconsYt, setIcons] = useState([]);
  const [singleVideo, setSingleVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [subscribers, setSubscribers] = useState("");
  const getSingleVideo = async () => {
    const res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    );

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
      console.log(res?.data?.items);
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
      <div className="flex flex-col pt-3 h-screen md:m-2 w-full text-white overflow-y-auto">
        <div className="flex  w-full mt-16 cursor-pointer lg:pl-7">
          <div className="w-full  flex flex-col">
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
            <div className="flex p-2 mb-14 flex-col text-[17px] md:text-base md:flex-row md:justify-between mt-2 space-x-5 xl:w-[65%] lg:w-[75%]">
              <div className="flex xl:mr-32">
                <div className="flex ">
                  <img
                    src={iconsYt ? iconsYt : ""}
                    className="rounded-full h-10 w-10 md:h-12 md:w-12"
                  />
                  <div className="flex flex-col  ml-2 ">
                    <h1 className="w-52 md:w-56  font-bold ">
                      {singleVideo?.snippet?.channelTitle}
                    </h1>
                    <p className="text-[#aaaaaa]">
                      {singleVideo && formatViewCount(subscribers)}
                      {singleVideo && " Subscribers"}
                    </p>
                  </div>
                </div>
                <button className="md:px-4 px-3  md:py-1 bg-white text-black rounded-full">
                  Subscribe
                </button>
              </div>
              <div className="flex mt-7 md:mt-2 space-x-3 lg:space-x-5   text-lg md:text-base">
                <div className="flex items-center cursor-pointer bg-[#454443] px-3 py-2 rounded-full">
                  <AiOutlineLike size="20px" className="mr-2" />
                  <span>
                    {formatViewCount(singleVideo?.statistics?.likeCount)}
                  </span>
                  <AiOutlineDislike size="20px" className="ml-3" />
                </div>
                <div className="flex items-center cursor-pointer bg-[#454443] px-3 py-2 rounded-full">
                  <PiShareFatLight size="20px" className="mr-2" />
                  <span>Share</span>
                </div>
                <div className="flex items-center cursor-pointer bg-[#454443] space-x-2   px-3 py-2  rounded-full">
                  <GoDownload />
                  <span>Download</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:w-[64%] lg:w-[73.5%] lg:ml-7 ">
          {comments?.map((comment, index) => {
            //console.log(typeof comment?.snippet?.topLevelComment?.snippet?.textDisplay);
            const cmnt = comment.snippet.topLevelComment.snippet;
            return (
              <>
                <div
                  key={index}
                  className="flex items-start space-x-4 mb-2 p-1 rounded-lg shadow-md"
                >
                  <img
                    src={cmnt.authorProfileImageUrl}
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="flex-1 text-white">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">
                        {cmnt.authorDisplayName}
                      </span>
                      <span className="text-[#AAAAAA] text-sm">
                        {formatPublishedDate(cmnt.publishedAt)}
                      </span>
                    </div>
                    <p className="mt-2 ">{cmnt.textDisplay}</p>
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
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
