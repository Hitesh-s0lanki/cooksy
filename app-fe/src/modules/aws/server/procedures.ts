import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getImageUrl } from "@/actions/aws-s3-actions";

export const awsRouter = createTRPCRouter({
  getImageUrl: protectedProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const response = await getImageUrl(input.key);

      if (response.status != 200 || !response.data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: response.message,
        });
      }

      return response;
    }),
});
