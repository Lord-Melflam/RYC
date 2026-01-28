# Quick Start Guide - RYC MVP

This guide will help you get the RYC MVP up and running in minutes.

## Prerequisites

- Node.js 20+
- Docker and Docker Compose (for easiest setup)
- PostgreSQL 16+ (if not using Docker)

## Option 1: Docker (Recommended)

The fastest way to run the entire stack:

```bash
# Clone the repository
git clone https://github.com/Lord-Melflam/RYC.git
cd RYC

# Start all services
docker-compose up --build
```

That's it! After Docker builds and starts the services:
- Frontend: http://localhost
- Backend API: http://localhost:3000
- API Docs: http://localhost:3000/api-docs
- Health Check: http://localhost:3000/healthz

## Option 2: Local Development

### Step 1: Start PostgreSQL

```bash
docker run -d \
  --name ryc-postgres \
  -e POSTGRES_DB=ryc \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16-alpine
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed

# Start development server
npm run dev
```

Backend will be running at http://localhost:3000

### Step 3: Setup Frontend

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be running at http://localhost:5173

## Verify Installation

### 1. Check Health Endpoint

```bash
curl http://localhost:3000/healthz
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-28T...",
  "service": "ryc-backend",
  "database": "connected"
}
```

### 2. List Courses

```bash
curl http://localhost:3000/api/courses
```

You should see 4 sample courses (CS101, CS201, MATH101, ENG201).

### 3. Get Course Details

```bash
curl http://localhost:3000/api/courses/<course-id>
```

Replace `<course-id>` with an ID from the previous response.

### 4. Submit a Review

```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "<course-id>",
    "rating": 5,
    "difficulty": 3,
    "workload": 4,
    "comment": "Great course for beginners!"
  }'
```

### 5. Access the Web UI

Open http://localhost:5173 (or http://localhost if using Docker) in your browser.

You should see:
- Course listing page
- Search and filter functionality
- Privacy policy link
- Click on a course to see details and write a review

## Testing

### Backend Tests

```bash
cd backend
npm test
```

All tests should pass:
```
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

### Frontend Tests

```bash
cd frontend
npm test
```

All tests should pass:
```
Test Files  1 passed (1)
Tests  1 passed (1)
```

## Features Demonstrated

### ✅ Privacy-First Design
- No user accounts required
- Anonymous review submission
- Cryptographically random anonymous IDs
- No personal data collection

### ✅ Layered Moderation
- Reviews start in PENDING status
- Community flagging system
- Automatic moderation on flag threshold
- Status tracking (PENDING → APPROVED/FLAGGED/REJECTED)

### ✅ Scalable Microservices
- Separate frontend and backend
- PostgreSQL database with Prisma ORM
- RESTful API design
- Docker containerization

### ✅ CI/CD
- GitHub Actions workflows for:
  - Backend testing and building
  - Frontend linting, testing, and building
  - Docker image building
- Workflows trigger on push and PR

### ✅ Incremental Delivery
- MVP includes:
  - Working course listing
  - Review submission
  - Review viewing
  - Flag system
  - Health monitoring
  - Complete documentation

## API Documentation

- Interactive Swagger UI: http://localhost:3000/api-docs
- Markdown docs: [docs/API.md](docs/API.md)
- OpenAPI spec: [backend/openapi.yaml](backend/openapi.yaml)

## Additional Documentation

- [README.md](README.md) - Complete project documentation
- [docs/PRIVACY.md](docs/PRIVACY.md) - Privacy policy
- [docs/MODERATION.md](docs/MODERATION.md) - Moderation guidelines
- [docs/API.md](docs/API.md) - API reference

## Troubleshooting

### Port Already in Use

If port 3000 or 5173 is already in use:

Backend:
```bash
PORT=3001 npm run dev
```

Frontend (edit `vite.config.ts`):
```typescript
server: {
  port: 5174,
  // ...
}
```

### Database Connection Issues

Check PostgreSQL is running:
```bash
docker ps | grep postgres
```

Verify DATABASE_URL in backend/.env:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ryc?schema=public"
```

### Prisma Issues

Regenerate client:
```bash
cd backend
npx prisma generate
```

Reset database:
```bash
npx prisma migrate reset
```

## Next Steps

1. ✅ Explore the web UI at http://localhost:5173
2. ✅ Try submitting a review
3. ✅ Flag a review to see moderation in action
4. ✅ Check the API documentation
5. ✅ Review the privacy policy
6. ✅ Read the moderation guidelines
7. ✅ Explore the codebase
8. ✅ Run the tests
9. ✅ Try building with Docker

## Production Deployment

For production deployment:

1. Set up a PostgreSQL database
2. Configure environment variables
3. Build Docker images:
   ```bash
   docker-compose build
   ```
4. Deploy to your preferred platform (AWS, GCP, Azure, etc.)
5. Set up proper DNS and SSL certificates
6. Configure monitoring and logging

See [README.md](README.md) for detailed deployment instructions.

## Support

- GitHub Issues: https://github.com/Lord-Melflam/RYC/issues
- Documentation: [docs/](docs/)
- API Reference: http://localhost:3000/api-docs

---

**Welcome to RYC - Privacy-first course reviews!** 🎓
