import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/CourseDetailPage';
import PrivacyPage from './pages/PrivacyPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="container">
            <h1 className="logo">
              <Link to="/">RYC - Rate Your Courses</Link>
            </h1>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/privacy">Privacy</Link>
            </nav>
          </div>
        </header>
        
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </main>
        
        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 RYC - Rate Your Courses. Privacy-first anonymous reviews.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
