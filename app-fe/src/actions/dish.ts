"use server";

import { imageGenerateNode } from "./image-generation-node";
import { youtubeNode } from "./youtube-node";

export const executeNodeAction = async (
    {
        dish_name,
        dish_description,
    }: {
        dish_name: string
        dish_description: string,
    }
) => {
    try {
        // generate the image 
        const image_generation = await imageGenerateNode(
            dish_name,
            dish_description
        )

        if (image_generation.status != 200 || !image_generation.data)
            throw new Error(image_generation.message)

        const image_key = image_generation.data as string

        // fetch the Youtube Video
        const video_generation = await youtubeNode(`Get the best recipe videos for ${dish_name} dish.`)

        if (video_generation.status != 200 || !video_generation.data)
            throw new Error(video_generation.message)

        return {
            data: {
                video_generation: video_generation.data,
                image_key
            },
            status: 200,
            message: "Nodes Successfully executed",
        }

    } catch (error) {
        console.error("Error Server Action Execution: ", error);
        return {
            message: "Something went wrong in Server Action Execution",
            status: 500,
        };
    }
}