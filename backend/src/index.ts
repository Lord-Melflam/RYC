import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import coursesRouter from './routes/courses';
import reviewsRouter from './routes/reviews';
import healthRouter from './routes/health';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation
try {
  const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
  console.warn('OpenAPI documentation not available');
}

// Routes
app.use('/healthz', healthRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/reviews', reviewsRouter);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'RYC - Rate Your Courses API',
    version: '1.0.0',
    endpoints: {
      health: '/healthz',
      courses: '/api/courses',
      reviews: '/api/reviews',
      docs: '/api-docs',
    },
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
  });
}

export default app;
