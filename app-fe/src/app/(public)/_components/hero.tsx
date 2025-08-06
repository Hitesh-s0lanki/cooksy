"use client";

import { SparklesCore } from "@/components/ui/sparkles";
import InputTextArea from "./input-textarea";

const Hero = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradient-bg-with-grid.png')] bg-cover relative">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={4.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-slate-800">
          {"What's Cooking Today?"}
        </h1>
        <p className=" text-md md:text-base lg:text-base text-slate-600 px-5 text-center">
          Your AI-powered sous-chef for personalized, mouthwatering recipes.
        </p>
      </div>
      <div className=" w-full md:w-4xl lg:w-4xl px-5  md:px-20 lg:px-20 z-10">
        <InputTextArea />
      </div>
    </div>
  );
};

export default Hero;
