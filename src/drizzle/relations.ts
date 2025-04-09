import { relations } from "drizzle-orm/relations";
import { categories, tasks, user, account, session } from "./schema";

export const tasksRelations = relations(tasks, ({one}) => ({
	category: one(categories, {
		fields: [tasks.categoryId],
		references: [categories.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	tasks: many(tasks),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));