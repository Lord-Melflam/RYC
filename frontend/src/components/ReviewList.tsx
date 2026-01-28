import { useState } from 'react';
import { Review } from '../types';
import { flagReview } from '../services/api';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  const [flaggingId, setFlaggingId] = useState<string | null>(null);
  const [flagReason, setFlagReason] = useState('');
  const [flagging, setFlagging] = useState(false);
  const [flagSuccess, setFlagSuccess] = useState(false);

  async function handleFlag(reviewId: string) {
    if (!flagReason.trim()) {
      alert('Please provide a reason for flagging this review');
      return;
    }

    setFlagging(true);
    try {
      await flagReview(reviewId, flagReason);
      setFlagSuccess(true);
      setFlaggingId(null);
      setFlagReason('');
      setTimeout(() => setFlagSuccess(false), 3000);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to flag review');
    } finally {
      setFlagging(false);
    }
  }

  if (reviews.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255, 255, 255, 0.6)' }}>
        No reviews yet. Be the first to review this course!
      </div>
    );
  }

  return (
    <div>
      <h3>Reviews ({reviews.length})</h3>
      
      {flagSuccess && (
        <div className="success">Review flagged successfully. Thank you for helping maintain quality!</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {reviews.map(review => (
          <div
            key={review.id}
            style={{
              backgroundColor: '#1a1a1a',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #333'
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div>
                <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>Rating: </span>
                <span style={{ fontWeight: 'bold' }}>{review.rating}/5</span>
              </div>
              <div>
                <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>Difficulty: </span>
                <span style={{ fontWeight: 'bold' }}>{review.difficulty}/5</span>
              </div>
              <div>
                <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>Workload: </span>
                <span style={{ fontWeight: 'bold' }}>{review.workload}/5</span>
              </div>
            </div>

            {review.comment && (
              <p style={{ margin: '1rem 0', lineHeight: '1.6' }}>{review.comment}</p>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.6)',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #333'
            }}>
              <div>
                {review.semester && review.year && (
                  <span>{review.semester} {review.year}</span>
                )}
              </div>
              <button
                onClick={() => setFlaggingId(review.id)}
                style={{
                  fontSize: '0.875rem',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: 'transparent',
                  border: '1px solid #666',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}
              >
                Flag
              </button>
            </div>

            {flaggingId === review.id && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#2a2a2a',
                borderRadius: '4px'
              }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Reason for flagging:
                </label>
                <textarea
                  value={flagReason}
                  onChange={(e) => setFlagReason(e.target.value)}
                  placeholder="E.g., inappropriate content, spam, personal attack..."
                  rows={3}
                  style={{ width: '100%', marginBottom: '0.5rem' }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleFlag(review.id)}
                    disabled={flagging}
                    style={{ flex: 1 }}
                  >
                    {flagging ? 'Submitting...' : 'Submit Flag'}
                  </button>
                  <button
                    onClick={() => {
                      setFlaggingId(null);
                      setFlagReason('');
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #666'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
