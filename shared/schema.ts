import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  version: text("version").notNull(),
  description: text("description"),
  author: text("author"),
  license: text("license"),
  keywords: jsonb("keywords"),
  weeklyDownloads: integer("weekly_downloads").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const packageDependencies = pgTable("package_dependencies", {
  id: serial("id").primaryKey(),
  packageId: integer("package_id").references(() => packages.id),
  name: text("name").notNull(),
  version: text("version").notNull(),
  type: text("type").notNull(), // 'dependencies' | 'devDependencies' | 'peerDependencies'
});

export const packageVersions = pgTable("package_versions", {
  id: serial("id").primaryKey(),
  packageId: integer("package_id").references(() => packages.id),
  version: text("version").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  changelog: text("changelog"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Package = typeof packages.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type PackageDependency = typeof packageDependencies.$inferSelect;
export type PackageVersion = typeof packageVersions.$inferSelect;
