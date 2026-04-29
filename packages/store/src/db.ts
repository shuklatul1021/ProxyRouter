import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const currentDir = dirname(fileURLToPath(import.meta.url));

// Load store-level DB config first so monorepo app-level .env files do not override it.
dotenv.config({ path: resolve(currentDir, "../.env") });
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (typeof databaseUrl !== "string" || databaseUrl.trim() === "") {
  throw new Error(
    "DATABASE_URL must be a non-empty string. Set it in open_router_version2/packages/store/.env or process environment.",
  );
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
export const prisma = new PrismaClient({ adapter });
