import { pgTable, unique, serial, text, foreignKey, boolean, timestamp, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



// export const categories = pgTable("categories", {
//   id: serial().primaryKey().notNull(),
//   name: text().notNull(),
//   userId: text('user_id').notNull(),
// }, (table) => [
//   unique("categories_name_key").on(table.name),
//   foreignKey({
//     columns: [table.userId],
//     foreignColumns: [user.id],
//     name: 'categories_user_id_fkey'
//   }).onDelete('cascade'),
// ]);
export const categories = pgTable(
  'categories',
  {
    id: serial().primaryKey().notNull(),
    name: text().notNull(),
    userId: text('user_id').notNull(),
  },
  (table) => [
    unique('categories_name_key').on(table.name),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'categories_user_id_fkey',
    }).onDelete('cascade'),
  ]
)

// export const tasks = pgTable("tasks", {
//   id: serial().primaryKey().notNull(),
//   title: text().notNull(),
//   done: boolean().default(false),
//   createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
//   categoryId: integer("category_id"),
//   userId: text('user_id').notNull(),
// }, (table) => [
//   foreignKey({
//     columns: [table.categoryId],
//     foreignColumns: [categories.id],
//     name: "tasks_category_id_fkey"
//   }).onDelete("cascade"),
// ]);

export const tasks = pgTable(
  'tasks',
  {
    id: serial().primaryKey().notNull(),
    title: text().notNull(),
    done: boolean().default(false),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    categoryId: integer('category_id'),
    userId: text('user_id').notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: 'tasks_category_id_fkey',
    }).onDelete('set null'),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'tasks_user_id_fkey',
    }).onDelete('cascade'),
  ]
)
export const verification = pgTable("verification", {
  id: text().primaryKey().notNull(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
  createdAt: timestamp("created_at", { mode: 'string' }),
  updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const user = pgTable("user", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  email: text().notNull(),
  emailVerified: boolean("email_verified").notNull(),
  image: text(),
  createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
  unique("user_email_unique").on(table.email),
]);

export const account = pgTable("account", {
  id: text().primaryKey().notNull(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
  scope: text(),
  password: text(),
  createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
  foreignKey({
    columns: [table.userId],
    foreignColumns: [user.id],
    name: "account_user_id_user_id_fk"
  }).onDelete("cascade"),
]);

export const session = pgTable("session", {
  id: text().primaryKey().notNull(),
  expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
  token: text().notNull(),
  createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull(),
}, (table) => [
  foreignKey({
    columns: [table.userId],
    foreignColumns: [user.id],
    name: "session_user_id_user_id_fk"
  }).onDelete("cascade"),
  unique("session_token_unique").on(table.token),
]);
