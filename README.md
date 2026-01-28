# RYC - Rate Your Courses

A privacy-first anonymous course review platform built with modern microservices architecture.

## 🎯 Features

- **Privacy-First**: No user accounts, completely anonymous reviews
- **Layered Moderation**: Multi-stage review process to ensure quality
- **Microservices Architecture**: Scalable backend with PostgreSQL
- **Modern Stack**: React + TypeScript frontend, Node + Express backend
- **Docker Support**: Full containerization for easy deployment
- **CI/CD**: Automated testing and building with GitHub Actions

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **API**: REST with OpenAPI/Swagger documentation
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions

### Project Structure

```
RYC/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── controllers/ # Business logic (future)
│   │   ├── middleware/  # Custom middleware (future)
│   │   └── types/       # TypeScript types (future)
│   ├── prisma/          # Database schema and migrations
│   ├── tests/           # API tests
│   └── openapi.yaml     # API documentation
├── frontend/            # React + Vite web app
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── services/    # API client
│       └── types/       # TypeScript types
├── docs/                # Additional documentation
└── .github/workflows/   # CI/CD pipelines
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 16+ (or use Docker)
- npm or yarn

### Local Development

#### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start PostgreSQL (or use Docker)
docker run -d \
  --name ryc-postgres \
  -e POSTGRES_DB=ryc \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16-alpine

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Start development server
npm run dev
```

Backend will be available at `http://localhost:3000`

API Documentation: `http://localhost:3000/api-docs`

#### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Docker Deployment

The easiest way to run the entire stack:

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

Services:
- Frontend: `http://localhost:80`
- Backend API: `http://localhost:3000`
- API Docs: `http://localhost:3000/api-docs`
- PostgreSQL: `localhost:5432`

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Run All Tests

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

## 📚 API Documentation

The API is documented using OpenAPI 3.0 specification. When the backend is running, visit:

- Swagger UI: `http://localhost:3000/api-docs`
- OpenAPI spec: `backend/openapi.yaml`

### Key Endpoints

- `GET /healthz` - Health check
- `GET /api/courses` - List all courses with statistics
- `GET /api/courses/:id` - Get course details with reviews
- `POST /api/reviews` - Submit a new review (anonymous)
- `POST /api/reviews/:id/flag` - Flag a review for moderation

## 🔒 Privacy & Security

### Privacy Features

- **No User Accounts**: Reviews are submitted without any registration
- **Anonymous IDs**: Each review gets a cryptographically random anonymous ID
- **No Tracking**: Minimal data collection, no personal information stored
- **IP Protection**: IP addresses are not logged for reviews

See [PRIVACY.md](docs/PRIVACY.md) for full privacy policy.

### Security Measures

- **Rate Limiting**: API endpoints are rate-limited to prevent abuse
- **Helmet.js**: Security headers enabled
- **Input Validation**: All inputs are validated
- **CORS**: Properly configured cross-origin resource sharing
- **SQL Injection Protection**: Using Prisma ORM with parameterized queries

## 🛡️ Moderation

Reviews go through a multi-stage moderation process:

1. **Pending**: New reviews start in pending state
2. **Auto-Moderation**: Future: AI-based content filtering
3. **Community Flagging**: Users can flag inappropriate reviews
4. **Manual Review**: Flagged reviews are reviewed by moderators

See [MODERATION.md](docs/MODERATION.md) for detailed moderation guidelines.

## 🔄 CI/CD

GitHub Actions workflows:

- **Backend CI**: Runs tests and builds on backend changes
- **Frontend CI**: Runs linter, tests, and builds on frontend changes
- **Docker Build**: Builds Docker images for deployment

Workflows run on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

## 🗄️ Database Schema

### Course
- id, code (unique), name, department, description
- Relationships: has many reviews

### Review
- id, courseId, rating, difficulty, workload, comment
- anonymousId (privacy-first identifier)
- semester, year (optional metadata)
- status (PENDING, APPROVED, REJECTED, FLAGGED)
- flagCount

### Flag
- id, reviewId, reason
- Used for community moderation

## 🛠️ Development

### Available Scripts

#### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm test` - Run tests
- `npm run lint` - Lint code

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run lint` - Lint code

## 📦 Deployment

### Environment Variables

#### Backend (.env)
```bash
PORT=3000
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/dbname?schema=public
```

### Production Deployment

1. Set up PostgreSQL database
2. Configure environment variables
3. Build and deploy using Docker:

```bash
docker-compose -f docker-compose.yml up -d
```

Or deploy services separately to your preferred hosting platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

## 🔗 Links

- [Privacy Policy](docs/PRIVACY.md)
- [Moderation Guidelines](docs/MODERATION.md)
- [API Documentation](http://localhost:3000/api-docs) (when running)

## 🙏 Acknowledgments

Built with privacy and user experience as top priorities. Special focus on:
- Anonymous, honest feedback
- Community-driven quality control
- Modern, scalable architecture
- Developer-friendly setup

---

**RYC - Rate Your Courses**: Empowering students with honest, anonymous course reviews.
