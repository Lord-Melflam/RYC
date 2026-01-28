# API Documentation

## Base URL

Local development: `http://localhost:3000`

## Authentication

RYC API does not require authentication. All operations are anonymous to protect user privacy.

## Rate Limiting

- 100 requests per 15 minutes per IP address
- Exceeding the limit returns `429 Too Many Requests`

## Endpoints

### Health Check

#### GET /healthz

Check the health status of the API and database connection.

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-28T12:00:00.000Z",
  "service": "ryc-backend",
  "database": "connected"
}
```

**Status Codes:**
- `200` - Service is healthy
- `503` - Service is unhealthy (database connection issue)

---

### Courses

#### GET /api/courses

List all courses with aggregated review statistics.

**Query Parameters:**
- `department` (optional) - Filter by department name
- `search` (optional) - Search in course code, name, or description

**Example Request:**
```bash
GET /api/courses?department=Computer%20Science&search=intro
```

**Response:**

```json
[
  {
    "id": "clx123abc",
    "code": "CS101",
    "name": "Introduction to Computer Science",
    "department": "Computer Science",
    "description": "Fundamentals of programming",
    "reviewCount": 15,
    "avgRating": 4.3,
    "avgDifficulty": 3.2,
    "avgWorkload": 3.8
  }
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

#### GET /api/courses/:id

Get detailed information about a specific course including all approved reviews.

**Example Request:**
```bash
GET /api/courses/clx123abc
```

**Response:**

```json
{
  "id": "clx123abc",
  "code": "CS101",
  "name": "Introduction to Computer Science",
  "department": "Computer Science",
  "description": "Fundamentals of programming",
  "reviews": [
    {
      "id": "clx456def",
      "rating": 5,
      "difficulty": 3,
      "workload": 4,
      "comment": "Great course!",
      "semester": "Fall",
      "year": 2023,
      "createdAt": "2023-12-01T10:00:00.000Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `404` - Course not found
- `500` - Server error

---

### Reviews

#### POST /api/reviews

Submit a new anonymous review for a course.

**Request Body:**

```json
{
  "courseId": "clx123abc",
  "rating": 5,
  "difficulty": 3,
  "workload": 4,
  "comment": "Great introductory course!",
  "semester": "Fall",
  "year": 2023
}
```

**Required Fields:**
- `courseId` (string) - ID of the course being reviewed
- `rating` (number, 1-5) - Overall course rating
- `difficulty` (number, 1-5) - Course difficulty level
- `workload` (number, 1-5) - Hours per week (1=light, 5=heavy)

**Optional Fields:**
- `comment` (string) - Detailed review text
- `semester` (string) - When the course was taken
- `year` (number) - Year the course was taken

**Response:**

```json
{
  "id": "clx789ghi",
  "message": "Review submitted successfully. It will be visible after moderation.",
  "status": "PENDING"
}
```

**Status Codes:**
- `201` - Review created successfully
- `400` - Invalid input (missing or out-of-range values)
- `404` - Course not found
- `500` - Server error

---

#### POST /api/reviews/:id/flag

Flag a review for moderation.

**Request Body:**

```json
{
  "reason": "Spam or inappropriate content"
}
```

**Required Fields:**
- `reason` (string) - Explanation for flagging the review

**Response:**

```json
{
  "message": "Review flagged successfully",
  "status": "FLAGGED"
}
```

**Status Codes:**
- `200` - Review flagged successfully
- `400` - Missing reason
- `404` - Review not found
- `500` - Server error

---

## Review Moderation Status

Reviews go through a moderation process with the following statuses:

- **PENDING** - Newly submitted, awaiting moderation
- **APPROVED** - Passed moderation, publicly visible
- **FLAGGED** - Community flagged, under review
- **REJECTED** - Failed moderation, not visible

## Privacy

- No user accounts or authentication required
- Each review receives a cryptographically random anonymous ID
- No IP addresses or personal information stored
- See [Privacy Policy](../PRIVACY.md) for details

## Error Responses

All errors follow a consistent format:

```json
{
  "error": "Error message"
}
```

Common error codes:
- `400` - Bad Request (invalid input)
- `404` - Not Found
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error
- `503` - Service Unavailable (database down)

## OpenAPI Specification

Interactive API documentation is available at `/api-docs` when the server is running.

The complete OpenAPI 3.0 specification is available at: [openapi.yaml](../../backend/openapi.yaml)

## Examples

### Complete Workflow

1. **List all courses**
```bash
curl http://localhost:3000/api/courses
```

2. **Get course details**
```bash
curl http://localhost:3000/api/courses/clx123abc
```

3. **Submit a review**
```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "clx123abc",
    "rating": 5,
    "difficulty": 3,
    "workload": 4,
    "comment": "Excellent course!"
  }'
```

4. **Flag a review**
```bash
curl -X POST http://localhost:3000/api/reviews/clx789ghi/flag \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Contains inappropriate content"
  }'
```

## Development

See the main [README](../README.md) for development setup instructions.
