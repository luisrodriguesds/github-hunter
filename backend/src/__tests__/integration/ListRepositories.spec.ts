import app from '../../app';
import api from '../../infra/api';
import request from 'supertest';
import MockAdapter from 'axios-mock-adapter';

describe('ListRepository', () => {
  it('should be able to list repository by username', async () => {
    const response = await request(app).get('/users/luisrodriguesds/repos');

    expect(response.body).toMatchObject(
      expect.objectContaining({
        data: expect.any(Array),
        total: expect.any(Number),
        page: expect.any(Number),
        perPage: expect.any(Number),
        lastPage: expect.any(Number),
      }),
    );
  });

  it('should not be able to list repository by non-exinting username', async () => {
    // Cause not exiting username with space
    const response = await request(app).get('/users/non exinting/repos');

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: 'error',
        message: expect.any(String),
      }),
    );
  });

  it('should be able throw unexpected Errors to handler of global errors', async () => {
    // Cause axios can throw unexpected errors, so like I did try to cacth the 404 error, I needed to cacth others errors
    const mock = new MockAdapter(api);

    mock
      .onGet('/users/luisrodriguesds/repos', { params: { searchText: 'John' } })
      .reply(404)
      .onAny()
      .reply(500);

    const response = await request(app).get('/users/luisrodriguesds/repos');

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: 'error',
        message: expect.any(String),
      }),
    );
  });
});
