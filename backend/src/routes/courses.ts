import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/courses - List all courses
router.get('/', async (req: Request, res: Response) => {
  try {
    const { department, search } = req.query;
    
    const where: any = {};
    
    if (department) {
      where.department = department;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { code: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } },
      ];
    }
    
    const courses = await prisma.course.findMany({
      where,
      include: {
        reviews: {
          where: { status: 'APPROVED' },
          select: {
            rating: true,
            difficulty: true,
            workload: true,
          },
        },
      },
      orderBy: { code: 'asc' },
    });
    
    // Calculate average ratings
    const coursesWithStats = courses.map(course => {
      const approvedReviews = course.reviews;
      const reviewCount = approvedReviews.length;
      
      const avgRating = reviewCount > 0
        ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
        : null;
      
      const avgDifficulty = reviewCount > 0
        ? approvedReviews.reduce((sum, r) => sum + r.difficulty, 0) / reviewCount
        : null;
      
      const avgWorkload = reviewCount > 0
        ? approvedReviews.reduce((sum, r) => sum + r.workload, 0) / reviewCount
        : null;
      
      return {
        id: course.id,
        code: course.code,
        name: course.name,
        department: course.department,
        description: course.description,
        reviewCount,
        avgRating: avgRating ? Number(avgRating.toFixed(1)) : null,
        avgDifficulty: avgDifficulty ? Number(avgDifficulty.toFixed(1)) : null,
        avgWorkload: avgWorkload ? Number(avgWorkload.toFixed(1)) : null,
      };
    });
    
    res.json(coursesWithStats);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// GET /api/courses/:id - Get a specific course with reviews
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        reviews: {
          where: { status: 'APPROVED' },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            rating: true,
            difficulty: true,
            workload: true,
            comment: true,
            semester: true,
            year: true,
            createdAt: true,
          },
        },
      },
    });
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

export default router;
