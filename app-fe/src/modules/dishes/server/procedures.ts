import { nanoid } from 'nanoid';
import { and, eq, sql } from "drizzle-orm"
import { db } from "@/db"
import { dishes } from "@/db/schema/dish"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { dishInsertSchema } from "../schema"

import { TRPCError } from "@trpc/server"
import { z } from 'zod';
import { MAX_FREE_TOKENS } from '@/constant';
import { executeNodeAction } from '@/actions/dish';

export const dishRouter = createTRPCRouter({

    create: protectedProcedure
        .input(dishInsertSchema)
        .mutation(async ({ input, ctx }) => {
            // 0) enforce free‐tier limit
            const [{ count }] = await db
                .select({ count: sql<number>`count(*)` })
                .from(dishes)
                .where(eq(dishes.user_id, ctx.auth.userId));

            if (Number(count) >= MAX_FREE_TOKENS) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: `Free tier limit reached (${MAX_FREE_TOKENS} dishes).`,
                });
            }

            // execute server actions 
            const additional_node = await executeNodeAction({
                dish_name: input.dish_name,
                dish_description: input.dish_description
            })

            if (additional_node.status != 200 || !additional_node.data || !additional_node.data?.image_key || !additional_node.data?.video_generation) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: additional_node.message,
                });
            }

            // 1) persist to our database
            const [inserted] = await db
                .insert(dishes)
                .values({
                    id: nanoid(),
                    user_id: ctx.auth.userId,
                    dish_name: input.dish_name,
                    dish_description: input.dish_description,
                    ingredients: input.ingredients,
                    recipe: input.recipe,
                    image_key: additional_node.data?.image_key || "",
                    youtube_link: additional_node.data?.video_generation || [],
                })
                .returning({ id: dishes.id });

            // 2) return the newly created dish ID so client can redirect
            return { id: inserted.id };
        }),
    getMany: protectedProcedure
        .query(async ({ ctx }) => {
            // 1) fetch raw rows for this user
            const raw = await db
                .select({
                    id: dishes.id,
                    dish_name: dishes.dish_name,
                    dish_description: dishes.dish_description,
                    image_key: dishes.image_key,
                    created_at: dishes.created_at,
                })
                .from(dishes)
                .where(eq(dishes.user_id, ctx.auth.userId))
                .orderBy(dishes.created_at);

            // 2) resolve signed URLs in parallel, catching failures per item
            const items = await Promise.all(
                raw.map(async (row) => {
                    return {
                        id: row.id,
                        dish_name: row.dish_name,
                        dish_description: row.dish_description,
                        created_at: row.created_at,
                    };
                })
            );

            return { items };
        }),
    getCount: protectedProcedure.query(async ({ ctx }) => {
        const row = await db
            .select({
                id: dishes.id,
            })
            .from(dishes)
            .where(eq(dishes.user_id, ctx.auth.userId));

        return { count: row.length };
    }),
    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            // 1) fetch the blog row, ensuring it belongs to the user
            const row = await db
                .select({
                    id: dishes.id,
                    dish_name: dishes.dish_name,
                    dish_description: dishes.dish_description,
                    ingredients: dishes.ingredients,
                    recipe: dishes.recipe,
                    youtube_link: dishes.youtube_link,
                    image_key: dishes.image_key,
                })
                .from(dishes)
                .where(
                    and(
                        eq(dishes.id, input.id),
                        eq(dishes.user_id, ctx.auth.userId)
                    )
                )
                .limit(1)
                .then((rows) => rows[0]);

            if (!row) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `Dish with id "${input.id}" not found.`,
                });
            }

            return {
                id: row.id,
                dish_name: row.dish_name,
                dish_description: row.dish_description,
                ingredients: row.ingredients,
                recipe: row.recipe,
                youtube_link: row.youtube_link,
                image_key: row.image_key
            };
        }),
})