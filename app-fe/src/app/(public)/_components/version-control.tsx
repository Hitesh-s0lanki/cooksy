import { Compare } from "@/components/ui/compare";

const VersionControl = () => {
  return (
    <div className="p-4 px-4 h-[700px] hidden md:flex lg:flex flex-col gap-10 justify-center items-center">
      <h3 className="text-xl md:text-3xl lg:text-4xl font-semibold mt-6">
        Version Check
      </h3>
      <div className="px-40 h-full w-full">
        <Compare
          firstImage="/old-version.png"
          secondImage="/new-version.png"
          firstImageClassName="object-center "
          secondImageClassname="object-center"
          className="h-full w-full "
          slideMode="hover"
        />
      </div>
    </div>
  );
};

export default VersionControl;
