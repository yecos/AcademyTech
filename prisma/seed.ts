import { PrismaClient } from "@prisma/client";
import { modules } from "../src/lib/curriculum";

const prisma = new PrismaClient();

// Categories to seed
const categories = [
  { slug: "arquitectura", name: "Arquitectura", icon: "🏗️", description: "Herramientas de visualización y renderizado arquitectónico", color: "#10b981", order: 1 },
  { slug: "programacion", name: "Programación", icon: "💻", description: "Desarrollo de software, lenguajes de programación y frameworks", color: "#3b82f6", order: 2 },
  { slug: "ciberseguridad", name: "Ciberseguridad", icon: "🔒", description: "Seguridad informática, ethical hacking y protección de datos", color: "#ef4444", order: 3 },
  { slug: "inteligencia-artificial", name: "Inteligencia Artificial", icon: "🤖", description: "Machine learning, deep learning y aplicaciones de IA", color: "#8b5cf6", order: 4 },
];

async function main() {
  console.log("Seeding database...");

  // 1. Create categories
  const categoryRecords: Record<string, { id: string }> = {};
  for (const cat of categories) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        icon: cat.icon,
        description: cat.description,
        color: cat.color,
        order: cat.order,
      },
      create: cat,
    });
    categoryRecords[cat.slug] = record;
    console.log(`Category created: ${record.name} (${record.id})`);
  }

  // 2. Create D5 Render course with categoryId pointing to "arquitectura"
  const arquitecturaCategory = categoryRecords["arquitectura"];

  const course = await prisma.course.upsert({
    where: { slug: "d5-render" },
    update: {
      categoryId: arquitecturaCategory.id,
      status: "published",
    },
    create: {
      slug: "d5-render",
      title: "D5 Render - Curso Completo",
      description:
        "Aprende D5 Render desde cero hasta nivel avanzado. Domina la iluminación, materiales, vegetación, animación y renderizado fotorrealista.",
      image: "/images/modules/modulo-1.png",
      icon: "🎨",
      order: 1,
      published: true,
      categoryId: arquitecturaCategory.id,
      level: "principiante",
      duration: "40 horas",
      status: "published",
    },
  });

  console.log(`Course created: ${course.title} (${course.id})`);

  // 3. Create modules and topics
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
    `Total: ${categories.length} categories, ${modules.length} modules, ${modules.reduce((s, m) => s + m.topics.length, 0)} topics`
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
