import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CourseDetail } from '../types';
import { fetchCourseById } from '../services/api';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (id) {
      loadCourse(id);
    }
  }, [id]);

  async function loadCourse(courseId: string) {
    try {
      setLoading(true);
      const data = await fetchCourseById(courseId);
      setCourse(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load course');
    } finally {
      setLoading(false);
    }
  }

  function handleReviewSubmitted() {
    setShowReviewForm(false);
    if (id) {
      loadCourse(id);
    }
  }

  if (loading) {
    return <div className="loading">Loading course details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!course) {
    return <div className="error">Course not found</div>;
  }

  // Calculate statistics
  const reviewCount = course.reviews.length;
  const avgRating = reviewCount > 0
    ? (course.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)
    : 'N/A';
  const avgDifficulty = reviewCount > 0
    ? (course.reviews.reduce((sum, r) => sum + r.difficulty, 0) / reviewCount).toFixed(1)
    : 'N/A';
  const avgWorkload = reviewCount > 0
    ? (course.reviews.reduce((sum, r) => sum + r.workload, 0) / reviewCount).toFixed(1)
    : 'N/A';

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>{course.code}: {course.name}</h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{course.department}</p>
        {course.description && <p>{course.description}</p>}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#1a1a1a',
        borderRadius: '8px'
      }}>
        <div>
          <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>Average Rating</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{avgRating}/5</div>
        </div>
        <div>
          <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>Difficulty</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{avgDifficulty}/5</div>
        </div>
        <div>
          <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>Workload</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{avgWorkload}/5</div>
        </div>
        <div>
          <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>Reviews</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{reviewCount}</div>
        </div>
      </div>

      <button
        onClick={() => setShowReviewForm(!showReviewForm)}
        style={{ marginBottom: '2rem' }}
      >
        {showReviewForm ? 'Cancel' : 'Write a Review'}
      </button>

      {showReviewForm && (
        <ReviewForm
          courseId={course.id}
          onSuccess={handleReviewSubmitted}
        />
      )}

      <ReviewList reviews={course.reviews} />
    </div>
  );
}
