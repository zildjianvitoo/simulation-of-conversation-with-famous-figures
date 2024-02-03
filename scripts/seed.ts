const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        {
          name: "Tokoh Terkenal",
        },
        {
          name: "Film",
        },
        {
          name: "Pemusik",
        },
        {
          name: "Hewan",
        },
        {
          name: "Filosofi",
        },
        {
          name: "Ilmuan",
        },
      ],
    });
  } catch (error) {
    console.error("Error seed dari default categories", error);
  } finally {
    await db.$disconnect();
  }
}

main();
