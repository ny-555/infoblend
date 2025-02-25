import { PrismaClient } from "@prisma/client";

/* eslint-disable no-var */
declare global {
  var cachePrisma: PrismaClient;
}
/* eslint-enable no-var */

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachePrisma) {
    global.cachePrisma = new PrismaClient();
  }
  prisma = global.cachePrisma;
}

export const db = prisma;
