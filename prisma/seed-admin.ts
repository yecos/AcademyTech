import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.error("ADMIN_EMAIL environment variable is required");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!user) {
    console.log(`No user found with email: ${adminEmail}`);
    console.log("The user will be promoted to teacher/admin on first Google login.");
    return;
  }

  if (user.role !== "teacher" && user.role !== "admin") {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: "teacher" },
    });
    console.log(`User ${user.email} promoted to teacher`);
  } else {
    console.log(`User ${user.email} already has role: ${user.role}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
