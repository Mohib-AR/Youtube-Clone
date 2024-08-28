import React, { useEffect, useState, useCallback } from "react";
import { YOUTUBE_VIDEO_API } from "./constant";
import { API_KEY } from "./constant";
import axios from "axios";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner, Button } from "flowbite-react";

export default function VideoContainer() {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const open = useSelector((store) => store.app.open);
  const category = useSelector((store) => store.app.category);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const url =
        category === "all" || category === "All"
          ? YOUTUBE_VIDEO_API
          : `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&q=${category}&type=video&key=${API_KEY}`;

      const res = await axios.get(url);
      setVideos(res?.data?.items || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);
  return (
    <>
      <div
        className={`flex flex-wrap overflow-y-auto gap-x-4 text-white gap-y-5 mb-20 -z-50 ${
          open
            ? "xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
            : "xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        } grid`}
      >
        {!loading ? (
          videos?.map((video, index) => {
            return (
              <Link
                to={`/watch?v=${
                  typeof video.id === "object" ? video.id.videoId : video.id
                }`}
                key={index}
              >
                <Card video={video} />
              </Link>
            );
          })
        ) : (
          <div className=" mx-auto w-[70vw] h-[50vh] flex items-center md:ml-32 justify-center">
            <Button color="" className="w-[20vw] pt-36 lg:pt-28">
              <Spinner aria-label="Spinner button example" size="xl" />
              <span className="pl-8 text-xl pt-2">Loading...</span>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
