import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";

type Props = {
  imgKey: string;
};

const ImageView = ({ imgKey }: Props) => {
  const trpc = useTRPC();

  // Fetch blog data
  const { data, isLoading } = useSuspenseQuery(
    trpc.aws.getImageUrl.queryOptions({ key: imgKey })
  );
  return (
    <div className="min-h-72 overflow-hidden flex justify-center items-center rounded-sm shadow-lg">
      {isLoading ? (
        <Image
          src={"/loading.gif"}
          alt="loading"
          className="object-cover"
          fill
        />
      ) : (
        <Image
          src={data.data || ""}
          alt="Image"
          className="object-cover"
          fill
        />
      )}
    </div>
  );
};

export default ImageView;
