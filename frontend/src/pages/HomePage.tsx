import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { fetchCourses } from '../services/api';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    loadCourses();
  }, [search, department]);

  async function loadCourses() {
    try {
      setLoading(true);
      const data = await fetchCourses({ search, department });
      setCourses(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  }

  const departments = Array.from(new Set(courses.map(c => c.department))).sort();

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Find Your Course</h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Browse anonymous, privacy-first course reviews from your peers
        </p>
      </div>

      <SearchBar
        search={search}
        onSearchChange={setSearch}
        department={department}
        onDepartmentChange={setDepartment}
        departments={departments}
      />

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading courses...</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          {courses.map(course => (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <CourseCard course={course} />
            </Link>
          ))}
        </div>
      )}

      {!loading && courses.length === 0 && (
        <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2rem' }}>
          No courses found. Try adjusting your search criteria.
        </p>
      )}
    </div>
  );
}
