import React from "react";
import axios from "axios";
import { API_KEY } from "./constant";
export default function Comments() {
  try {
    const res = axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&textFormat=plainText&part=snippet&videoId=${videoID}&maxResults=30`
    );
  } catch (error) {
    console.log(err);
  }

  return <div></div>;
}
