// File: index.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Connected to the database");

  // Place your database operations here.
  // For example, to fetch all users (assuming you have a User model):
  // const users = await prisma.user.findMany();
  // console.log(users);
}

main()
  .catch((error) => {
    console.error("Error executing main function:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Disconnected from the database");
  });
