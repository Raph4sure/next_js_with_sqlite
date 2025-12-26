import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const prismaClientSingleton = () => {
    // 1. In Prisma 7, you just provide the URL in an options object.
    // The adapter will create the better-sqlite3 instance for you internally.
    const adapter = new PrismaBetterSqlite3({
        url: "file:./prisma/dev.db",
    });

    // 2. Pass the adapter to the PrismaClient
    return new PrismaClient({ adapter });
};

declare const globalThis: {
    prisma: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const db = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
