import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Robust Prisma client initialization.
 * Detects invalid DATABASE_URL (e.g. system env overriding .env with SQLite path)
 * and strips it so Prisma falls back to the .env value.
 */
function createPrismaClient(): PrismaClient {
  const dbUrl = process.env.DATABASE_URL || "";

  // Detect invalid URLs that override our .env (e.g. system env with SQLite path)
  if (dbUrl.startsWith("file:") || dbUrl === "" || dbUrl === "undefined") {
    // Delete the invalid env var so dotenv can load the correct one from .env
    delete process.env.DATABASE_URL;

    // Re-load .env manually
    try {
      const fs = require("fs");
      const path = require("path");
      const envPath = path.resolve(process.cwd(), ".env");
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, "utf-8");
        for (const line of envContent.split("\n")) {
          const match = line.match(/^([^#=]+)=(.*)$/);
          if (match) {
            const key = match[1].trim();
            const value = match[2].trim();
            if (key === "DATABASE_URL" && value.startsWith("postgresql://")) {
              process.env.DATABASE_URL = value;
              break;
            }
          }
        }
      }
    } catch {
      // Ignore fs errors (e.g. in edge runtime)
    }
  }

  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
