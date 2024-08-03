import React, { useEffect, useState } from "react";
import { API_KEY } from "./constant";
import axios from "axios";
import { useSelector } from "react-redux";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { formatViewCount } from "./constant";
import { formatPublishedDate } from "./constant";
export default React.memo(function Card({ video }) {
  const open = useSelector((store) => store.app.open);

  const [iconsYt, setIcons] = useState([]);
  const getYtIcons = async () => {
    if (!video) return;
    try {
      const icons = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${video?.snippet?.channelId}&key=${API_KEY}`
      );
      if (!icons) return;
      setIcons(icons?.data?.items[0]?.snippet?.thumbnails?.high?.url);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getYtIcons();
  }, [video]);

  return (
    <>
      <div className="flex flex-col w-full h-full rounded-lg shadow-lg">
        <div className="mb-4">
          <div className="h-fit mb-3">
            <img
              className="w-full h-fit  object-cover rounded-lg"
              src={video?.snippet?.thumbnails?.medium?.url}
              alt="Loading..."
            />
          </div>
          <div className="font-bold text-[17px] text-[#F1F1F1] flex space-x-2">
            <img src={iconsYt} alt="loading" className="w-9 h-9 rounded-full" />
            <div className="w-fit text-wrap truncate max-w-fit">
              {video?.snippet?.title}
            </div>
          </div>

          <div className="text-[#AAAAAA] text-[15px] flex flex-col ml-10">
            <div>{video?.snippet?.channelTitle}</div>
            <div>
              {(video && formatViewCount(video?.statistics?.viewCount)) ||
                formatViewCount(Math.random() * 120000 + 5)}{" "}
              views {video && formatPublishedDate(video?.snippet?.publishedAt)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
