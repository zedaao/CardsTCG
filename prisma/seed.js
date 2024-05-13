import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {
      email: "leon.ueda2016@gmail.com",
    },
    create: {
      name: "leon lopes",
      email: "leon.ueda2016@gmail.com",
      password: "123123",
      admin: true,
    },
    update: {},
  });

  await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Blue-Eyes White Dragon",
      description: "Uma carta",
      price: 40,
      type: "Card",
      imageUrl:
        "https://www.duelshop.com.br/5728-large_default/blue-eyes-white-dragon-ldk2-enk01-common.jpg",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit();
  });
