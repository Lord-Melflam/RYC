import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed courses
  const courses = [
    {
      code: 'CS101',
      name: 'Introduction to Computer Science',
      department: 'Computer Science',
      description: 'Fundamentals of programming and problem-solving',
    },
    {
      code: 'CS201',
      name: 'Data Structures and Algorithms',
      department: 'Computer Science',
      description: 'Study of fundamental data structures and algorithms',
    },
    {
      code: 'MATH101',
      name: 'Calculus I',
      department: 'Mathematics',
      description: 'Introduction to differential and integral calculus',
    },
    {
      code: 'ENG201',
      name: 'Technical Writing',
      department: 'English',
      description: 'Writing skills for technical and professional contexts',
    },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { code: course.code },
      update: {},
      create: course,
    });
  }

  console.log('Courses seeded successfully');

  // Seed sample reviews (approved)
  const cs101 = await prisma.course.findUnique({ where: { code: 'CS101' } });
  if (cs101) {
    await prisma.review.create({
      data: {
        courseId: cs101.id,
        rating: 5,
        difficulty: 3,
        workload: 4,
        comment: 'Great introduction to programming! Professor was very helpful.',
        anonymousId: 'anon_' + Math.random().toString(36).substring(7),
        semester: 'Fall',
        year: 2023,
        status: 'APPROVED',
      },
    });

    await prisma.review.create({
      data: {
        courseId: cs101.id,
        rating: 4,
        difficulty: 2,
        workload: 3,
        comment: 'Good course for beginners, assignments were fair.',
        anonymousId: 'anon_' + Math.random().toString(36).substring(7),
        semester: 'Spring',
        year: 2024,
        status: 'APPROVED',
      },
    });
  }

  const cs201 = await prisma.course.findUnique({ where: { code: 'CS201' } });
  if (cs201) {
    await prisma.review.create({
      data: {
        courseId: cs201.id,
        rating: 4,
        difficulty: 4,
        workload: 5,
        comment: 'Challenging but rewarding. Be prepared to spend time on the projects.',
        anonymousId: 'anon_' + Math.random().toString(36).substring(7),
        semester: 'Fall',
        year: 2023,
        status: 'APPROVED',
      },
    });
  }

  console.log('Sample reviews seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
