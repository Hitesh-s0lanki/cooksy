import { awsRouter } from "@/modules/aws/server/procedures";
import { dishRouter } from "@/modules/dishes/server/procedures";
import { createTRPCRouter } from "@/trpc/init";

export const appRouter = createTRPCRouter({
  aws: awsRouter,
  dish: dishRouter
});

export type AppRouter = typeof appRouter;
