export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  description?: string;
  reviewCount: number;
  avgRating: number | null;
  avgDifficulty: number | null;
  avgWorkload: number | null;
}

export interface Review {
  id: string;
  rating: number;
  difficulty: number;
  workload: number;
  comment?: string;
  semester?: string;
  year?: number;
  createdAt: string;
}

export interface CourseDetail extends Omit<Course, 'reviewCount' | 'avgRating' | 'avgDifficulty' | 'avgWorkload'> {
  reviews: Review[];
}

export interface ReviewInput {
  courseId: string;
  rating: number;
  difficulty: number;
  workload: number;
  comment?: string;
  semester?: string;
  year?: number;
}
