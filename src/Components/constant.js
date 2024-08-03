import { GoHomeFill } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { CgPlayButtonR } from "react-icons/cg";
import { MdOutlineMusicNote } from "react-icons/md";
import { GoTrophy } from "react-icons/go";
import { ImNewspaper } from "react-icons/im";
import { SiYoutubegaming } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineFlag } from "react-icons/ai";
import { MdOutlineFeedback } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
export const BASE_URL = "https://www.googleapis.com/youtube/v3";
export const API_KEY = "AIzaSyBLnihrtbuenGE3GGwkXdlEyBlX7Mw2F7s";

export const YOUTUBE_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=48&regionCode=IN&key=AIzaSyBLnihrtbuenGE3GGwkXdlEyBlX7Mw2F7s";
export const buttonList = [
  "All",
  "JavaScript",
  "AI",
  "Algorithm",
  "Podcasts",
  "News",
  "Resume",
  "Live",
  "Reverberation",
  "Religous recitation",
  "Colleges",
  "UserInterface Design",
  "Motivation",
  "Interview",
  "Watched",
  "Vlogs",
  "Recently Uploaded",
  "History",
];
export const imgSrc1 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgRFkxDMlMLtzh8DuIPD8HksxKpBXBZz9n6pwz4QBYEzPcdyFI_H5tQqzhC-CwHQcM9U4&usqp=CAU";
export const sidebarNames = [
  {
    IconName: GoHomeFill,
    title: "Home",
  },
  {
    IconName: SiYoutubeshorts,
    title: "Shorts",
  },
  {
    IconName: MdOutlineSubscriptions,
    title: "Subscriptions",
    hr: true,
  },
  {
    IconName: CgPlayButtonR,
    title: "You",
  },
  {
    IconName: GoHistory,
    title: "History",
    hr: true,
  },
  {
    IconName: MdOutlineMusicNote,
    title: "Music",
  },
  {
    IconName: SiYoutubegaming,
    title: "Gaming",
  },
  {
    IconName: ImNewspaper,
    title: "News",
  },
  {
    IconName: GoTrophy,
    title: "Sport",
    hr: true,
  },
  {
    IconName: IoSettingsOutline,
    title: "Settings",
  },
  {
    IconName: AiOutlineFlag,
    title: "Flag history",
  },
  {
    IconName: IoIosHelpCircleOutline,
    title: "Help",
  },
  {
    IconName: MdOutlineFeedback,
    title: "Send Feedback",
    hr: true,
  },
];
export const formatViewCount = (num) => {
  if (!num) return;
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};
export const formatPublishedDate = (date) => {
  if (!date) return "Unknown date";
  return formatDistanceToNowStrict(parseISO(date), { addSuffix: true });
};
