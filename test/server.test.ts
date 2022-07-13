import supertest from 'supertest';
import request from 'supertest'
import { AppServer } from '../src/server'

describe('GET /', () => {
  it('/', async () => {
    const server = new AppServer();
    const res = await request(server.app).get('/')
    expect(res.status).toBe(200);
  });
});
