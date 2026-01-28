import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div style={{
      padding: '1.5rem',
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      border: '1px solid #333',
      transition: 'all 0.3s',
      cursor: 'pointer',
      height: '100%',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = '#646cff';
      e.currentTarget.style.transform = 'translateY(-4px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '#333';
      e.currentTarget.style.transform = 'translateY(0)';
    }}>
      <h3 style={{ margin: '0 0 0.5rem 0' }}>{course.code}</h3>
      <p style={{ margin: '0 0 1rem 0', color: 'rgba(255, 255, 255, 0.87)' }}>
        {course.name}
      </p>
      <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 1rem 0' }}>
        {course.department}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
        <div>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Rating: </span>
          <span style={{ fontWeight: 'bold' }}>
            {course.avgRating ? `${course.avgRating}/5` : 'N/A'}
          </span>
        </div>
        <div>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Reviews: </span>
          <span style={{ fontWeight: 'bold' }}>{course.reviewCount}</span>
        </div>
      </div>
    </div>
  );
}
