"use client";

import Header from "@/components/header";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getDishwById } from "@/lib/utils";
import YouTube, { YouTubeProps } from "react-youtube";
import ImageView from "./image-view";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

type Props = {
  id: string;
};

const opts: YouTubeProps["opts"] = {
  height: "200",
  width: "300",
  playerVars: {
    autoplay: 0,
  },
};

const MainScreen = ({ id }: Props) => {
  const trpc = useTRPC();

  // Fetch blog data
  const { data: dish } = useSuspenseQuery(
    trpc.dish.getOne.queryOptions({ id: id })
  );

  if (!dish) return <div>No Dish Found!</div>;

  return (
    <>
      <Header title={dish.dish_name} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {/* Section One Similar to kya banana hai  */}
        <div className="lg:col-span-2 space-y-6 border-r-2">
          <CardHeader>
            <div className="flex items-center justify-between"></div>
          </CardHeader>

          <CardContent>
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
              <ImageView imgKey={dish.image_key || "/loading.gif"} />
            </div>

            <CardTitle className="text-2xl mb-3">{dish.dish_name}</CardTitle>
            <p className="text-muted-foreground mb-6">
              {dish.dish_description}
            </p>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {dish.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span className="text-sm">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-4">
                Recipe Instructions
              </h3>
              {dish.recipe.map((step, index) => (
                <div key={index} className="flex items-start">
                  {/* Indicator and connector */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    {index !== dish.recipe.length - 1 && (
                      <div className="w-px bg-gray-200 flex-1 mt-1" />
                    )}
                  </div>

                  {/* Step content */}
                  <div className="ml-4 pb-4">
                    <p className="text-sm leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </div>

        {/* Section One Similar to Youtube Video */}
        <div className="p-5 flex flex-col gap-5">
          <div>
            <h3 className="text-xl font-semibold">Video Tutorials</h3>
            <p className="text-sm text-muted-foreground">
              Watch these helpful videos to perfect your cooking
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {(dish.youtube_link || []).map((videoUrl, index) => (
              <div key={index} className="flex-shrink-0 w-72">
                <YouTube videoId={videoUrl} opts={opts} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
