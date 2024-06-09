const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create a new pet with a related cat
  const newPet = await prisma.pet.create({
    data: {
      name: "Vili",
      species: "CAT",
      owner: {
        connect: {
          email: "testaaja@gmail.com",
          // replace with the email of the existing user
        },
      },
      cat: {
        create: {
          pettyNames: ["Möysi", "Lutu"],
          colorOfHair: "musta-valkoinen",
          hair: "normaali",
          personality: "kuningas",
          healthCheck: "terve",
          bio: "Iskän lemppari poika.",
        },
      },
    },
  });

  console.log(`Created new pet: ${newPet.name} (ID: ${newPet.id})`);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
