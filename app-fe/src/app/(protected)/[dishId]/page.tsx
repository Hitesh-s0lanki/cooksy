import NotFoundPage from "@/app/not-found";
import MainScreen from "./_components/main-screen";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorState } from "@/components/error-state";
import Loading from "@/components/loading";

type Props = {
  params: Promise<{ dishId: string }>;
};

const DishPage = async ({ params }: Props) => {
  const paramsObj = await params;

  if (!paramsObj.dishId) {
    return <NotFoundPage />;
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.dish.getOne.queryOptions({ id: paramsObj.dishId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Something went wrong"
              description="Please try again later"
            />
          }>
          <MainScreen id={paramsObj.dishId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default DishPage;
