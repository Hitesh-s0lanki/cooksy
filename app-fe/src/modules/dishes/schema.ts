import { z } from "zod";

export const dishInsertSchema = z.object({
    dish_name: z
        .string()
        .min(1, { message: "Dish name is required" }),

    dish_description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters" }),

    ingredients: z
        .array(
            z.string().min(1, { message: "Ingredient cannot be empty" })
        )
        .min(1, { message: "At least one ingredient is required" }),

    recipe: z
        .array(
            z.string().min(1, { message: "Recipe step cannot be empty" })
        )
        .min(1, { message: "At least one recipe step is required" }),
});

// TS type for ease of use
export type DishInsertInput = z.infer<typeof dishInsertSchema>;
