"use server";

import axios from "axios";

export const youtubeNode = async (query: string) => {
  try {
    if (!process.env.YOUTUEB_BASE_URL)
      throw new Error("YOutube base url not found!");

    const params = {
      part: "snippet",
      q: query,
      maxResults: 5,
      videoDuration: "medium",
      type: "video",
      key: "AIzaSyBiAoMxqleKfA-iRjd_-h5g6ceGEXljE5o",
    };
    const resp = await axios.get(process.env.YOUTUEB_BASE_URL + "/search", {
      params,
    });

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: resp.data.items?.map((video: any) => {
        return video.id.videoId;
      }) || [],
      status: 200,
      message: "Youtube Node Successfully executed",
    };
  } catch (error) {
    console.log("Something went wrong in Youtube Node: ", error);
    return {
      message: "Failed to Get Youtube video",
      status: 500,
      data: [],
    };
  }
};
