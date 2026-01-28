import request from 'supertest';
import app from '../src/index';

describe('Health Check', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/healthz')
      .expect('Content-Type', /json/);
    
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('service', 'ryc-backend');
  });
});

describe('Root Endpoint', () => {
  it('should return API information', async () => {
    const response = await request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/);
    
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('endpoints');
  });
});

describe('404 Handler', () => {
  it('should return 404 for unknown routes', async () => {
    const response = await request(app)
      .get('/unknown-route')
      .expect(404)
      .expect('Content-Type', /json/);
    
    expect(response.body).toHaveProperty('error', 'Not Found');
  });
});
