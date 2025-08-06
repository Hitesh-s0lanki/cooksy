import ExploreSection from "./_components/explore";
import Hero from "./_components/hero";
// import PricingSection from "./_components/pricing-section";
// import VersionControl from "./_components/version-control";
import Workflow from "./_components/workflow-section";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Workflow />
      {/* <div className="w-full  pt-10 lg:pt-28 md:pt-28 px-8 md:px-20 lg:px-40">
        <div className="h-[0.5px] bg-[#BDBDBD] w-full " />
      </div> */}
      {/* <PricingSection /> */}
      {/* <div className="w-full  pt-10 lg:pt-28 md:pt-28 px-8 md:px-20 lg:px-40">
        <div className="h-[0.5px] bg-[#BDBDBD] w-full " />
      </div>
      <VersionControl /> */}
      <div className="w-full  pt-10 lg:pt-28 md:pt-28 px-8 md:px-20 lg:px-40">
        <div className="h-[0.5px] bg-[#BDBDBD] w-full " />
      </div>
      <ExploreSection />
    </>
  );
};

export default HomePage;
