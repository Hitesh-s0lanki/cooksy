import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Image src={"/loading.gif"} alt="loading" height={200} width={200} />
    </div>
  );
};

export default Loading;
