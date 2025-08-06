import { nanoid } from "nanoid";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const dishes = pgTable("dishes", {
    id: text("id").primaryKey().$defaultFn(() => nanoid()),
    dish_name: text("dish_name").notNull(),
    dish_description: text("dish_description").notNull(),
    ingredients: text("ingredients").array().notNull(),
    recipe: text("recipe").array().notNull(),
    image_key: text("image_key"),
    youtube_link: text("youtube_link").array(),
    user_id: text("user_id").notNull(),            // <-- added
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
});