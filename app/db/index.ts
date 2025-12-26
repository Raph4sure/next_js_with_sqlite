import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const prismaClientSingleton = () => {
    const adapter = new PrismaBetterSqlite3({
        url: "file:./prisma/dev.db",
    });

    return new PrismaClient({ adapter });
};

declare const globalThis: {
    prisma: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const db = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
