import { PrismaClient } from "@prisma/client";
import { modules } from "../src/lib/curriculum";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create D5 Render course
  const course = await prisma.course.upsert({
    where: { slug: "d5-render" },
    update: {},
    create: {
      slug: "d5-render",
      title: "D5 Render - Curso Completo",
      description:
        "Aprende D5 Render desde cero hasta nivel avanzado. Domina la iluminación, materiales, vegetación, animación y renderizado fotorrealista.",
      image: "/images/modules/modulo-1.png",
      icon: "🎨",
      order: 1,
      published: true,
    },
  });

  console.log(`Course created: ${course.title} (${course.id})`);

  // Create modules and topics
  for (const mod of modules) {
    const dbModule = await prisma.module.upsert({
      where: {
        courseId_number: {
          courseId: course.id,
          number: mod.number,
        },
      },
      update: { title: mod.title },
      create: {
        number: mod.number,
        title: mod.title,
        courseId: course.id,
      },
    });

    console.log(`  Module ${mod.number}: ${mod.title}`);

    for (let i = 0; i < mod.topics.length; i++) {
      const topic = mod.topics[i];
      await prisma.topic.upsert({
        where: {
          moduleId_number: {
            moduleId: dbModule.id,
            number: i + 1,
          },
        },
        update: {
          name: topic.name,
          difficulty: topic.difficulty,
          estimatedTime: topic.estimatedTime,
        },
        create: {
          name: topic.name,
          number: i + 1,
          difficulty: topic.difficulty,
          estimatedTime: topic.estimatedTime,
          moduleId: dbModule.id,
        },
      });
    }

    console.log(`    ${mod.topics.length} topics created`);
  }

  console.log("\nSeeding complete!");
  console.log(
    `Total: ${modules.length} modules, ${modules.reduce((s, m) => s + m.topics.length, 0)} topics`
  );
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
