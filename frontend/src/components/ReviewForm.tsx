import { useState, FormEvent } from 'react';
import { submitReview } from '../services/api';

interface ReviewFormProps {
  courseId: string;
  onSuccess: () => void;
}

export default function ReviewForm({ courseId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [difficulty, setDifficulty] = useState(3);
  const [workload, setWorkload] = useState(3);
  const [comment, setComment] = useState('');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await submitReview({
        courseId,
        rating,
        difficulty,
        workload,
        comment: comment.trim() || undefined,
        semester: semester || undefined,
        year,
      });
      
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: '#1a1a1a',
      padding: '2rem',
      borderRadius: '8px',
      marginBottom: '2rem'
    }}>
      <h3>Write Your Review</h3>
      <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '1.5rem' }}>
        Your review is completely anonymous. No personal information is collected.
      </p>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">Review submitted! It will appear after moderation.</div>}

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Overall Rating: {rating}/5
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Difficulty: {difficulty}/5
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Workload (hours/week): {workload}/5
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={workload}
          onChange={(e) => setWorkload(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Comment (optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          style={{ width: '100%' }}
          placeholder="Share your experience with this course..."
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Semester (optional)
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="">Select...</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Year (optional)
          </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            min="2000"
            max={new Date().getFullYear() + 1}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <button type="submit" disabled={submitting} style={{ width: '100%' }}>
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
