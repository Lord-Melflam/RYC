import { Course, CourseDetail, ReviewInput } from '../types';

export async function fetchCourses(params?: { department?: string; search?: string }): Promise<Course[]> {
  const queryParams = new URLSearchParams();
  if (params?.department) queryParams.append('department', params.department);
  if (params?.search) queryParams.append('search', params.search);
  
  const url = `/api/courses${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  
  return response.json();
}

export async function fetchCourseById(id: string): Promise<CourseDetail> {
  const response = await fetch(`/api/courses/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch course');
  }
  
  return response.json();
}

export async function submitReview(review: ReviewInput): Promise<{ id: string; message: string }> {
  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to submit review');
  }
  
  return response.json();
}

export async function flagReview(reviewId: string, reason: string): Promise<void> {
  const response = await fetch(`/api/reviews/${reviewId}/flag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reason }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to flag review');
  }
}
