import { pgTable, serial, timestamp, text, varchar, integer, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 200 }).notNull(),
    summary: varchar("summary", { length: 500 }).notNull(),
    content: text("content").notNull(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("blog_posts_slug_idx").on(table.slug),
    index("blog_posts_created_at_idx").on(table.created_at),
  ]
);

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("users_username_idx").on(table.username),
  ]
);

export const gameRecords = pgTable(
  "game_records",
  {
    id: serial("id").primaryKey(),
    user_id: serial("user_id").notNull(),
    scenario: varchar("scenario", { length: 200 }).notNull(),
    final_score: integer("final_score").notNull(),
    result: varchar("result", { length: 20 }).notNull(), // 'win' | 'lose'
    played_at: timestamp("played_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("game_records_user_id_idx").on(table.user_id),
    index("game_records_played_at_idx").on(table.played_at),
  ]
);
