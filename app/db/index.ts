import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import sqlite from "better-sqlite3";

const prismaClientSingleton = () => {
    // 1. Initialize the better-sqlite3 driver
    // Ensure the path to your .db file is correct relative to the root
    const libsql = new sqlite("./prisma/dev.db");

    // 2. Initialize the Prisma adapter
    const adapter = new PrismaBetterSqlite3(libsql);

    // 3. Instantiate PrismaClient with the adapter
    // In Prisma 7, passing the adapter is mandatory for local SQLite
    return new PrismaClient({ adapter });
};

declare const globalThis: {
    prisma: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const db = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
