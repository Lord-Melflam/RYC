import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const router = Router();
const prisma = new PrismaClient();

// Generate anonymous ID for privacy
function generateAnonymousId(): string {
  return 'anon_' + crypto.randomBytes(16).toString('hex');
}

// POST /api/reviews - Create a new review
router.post('/', async (req: Request, res: Response) => {
  try {
    const { courseId, rating, difficulty, workload, comment, semester, year } = req.body;
    
    // Validation
    if (!courseId) {
      return res.status(400).json({ error: 'courseId is required' });
    }
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'rating must be between 1 and 5' });
    }
    
    if (!difficulty || difficulty < 1 || difficulty > 5) {
      return res.status(400).json({ error: 'difficulty must be between 1 and 5' });
    }
    
    if (!workload || workload < 1 || workload > 5) {
      return res.status(400).json({ error: 'workload must be between 1 and 5' });
    }
    
    // Check if course exists
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    // Create review with privacy-first anonymous ID
    const review = await prisma.review.create({
      data: {
        courseId,
        rating,
        difficulty,
        workload,
        comment: comment || null,
        semester: semester || null,
        year: year || null,
        anonymousId: generateAnonymousId(),
        status: 'PENDING', // All reviews start as pending for moderation
      },
    });
    
    res.status(201).json({
      id: review.id,
      message: 'Review submitted successfully. It will be visible after moderation.',
      status: review.status,
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// POST /api/reviews/:id/flag - Flag a review for moderation
router.post('/:id/flag', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    if (!reason) {
      return res.status(400).json({ error: 'reason is required' });
    }
    
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    // Create flag
    await prisma.flag.create({
      data: {
        reviewId: id,
        reason,
      },
    });
    
    // Update review flag count and status
    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        flagCount: { increment: 1 },
        status: review.flagCount >= 2 ? 'FLAGGED' : review.status,
      },
    });
    
    res.json({
      message: 'Review flagged successfully',
      status: updatedReview.status,
    });
  } catch (error) {
    console.error('Error flagging review:', error);
    res.status(500).json({ error: 'Failed to flag review' });
  }
});

export default router;
