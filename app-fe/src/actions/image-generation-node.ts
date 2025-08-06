"use server";

import Openai from "openai";
import { downloadAndUploadImage } from "./aws-s3-actions";

export const imageGenerateNode = async (name: string, description: string) => {
  if (!process.env.OPENAI_API_KEY) {
    return {
      message: "Openai key not found!",
      status: 400,
    };
  }

  try {
    const openai = new Openai({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `
                Dish name = ${name} dish
                
                Description : ${description}
                `,
      n: 1,
      size: "1792x1024",
    });

    if (!response || !response.data)
      throw new Error("Something went wrong in Generating Image using Dalle");

    const image_url = response?.data[0].url;

    if (!image_url) throw new Error("Something went wrong in Generating Image using Dalle");

    const image_key = await downloadAndUploadImage(image_url, name.split(" ").join("_") + ".png")

    if (!image_url) throw new Error("Failed to Generated Image");

    return {
      status: 200,
      message: "Successfully Generated Image",
      data: image_key,
    };
  } catch (error) {
    console.log("Something went wrong in Youtube Node: ", error);
    return {
      message: "Failed to Generate Image",
      status: 500,
    };
  }
};
