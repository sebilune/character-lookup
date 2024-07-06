/* Dependencies */
import axios, { AxiosInstance } from "axios";

/* Types */
import type YouTubeVideo from "../types/YouTubeVideo";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://youtube-scraper-api.vercel.app/api/",
});

const getVideoData = async (
  characterName: string,
  animeName: string
): Promise<YouTubeVideo | null> => {
  const searchQuery = `${characterName} ${animeName}`;

  try {
    const response = await axiosInstance.post("/search", {
      query: searchQuery,
    });

    if (response.status === 200 && response.data.videos.length > 0) {
      const topVideo = response.data.videos.reduce(
        (prev: YouTubeVideo, current: YouTubeVideo) =>
          prev.views > current.views ? prev : current
      );

      return {
        url: topVideo.link,
        views: topVideo.views,
        title: topVideo.title,
      };
    } else {
      console.error("Failed to fetch or no videos found:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default getVideoData;
