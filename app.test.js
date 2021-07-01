const { app } = require('./handler');
const request = require('supertest');

beforeAll(() => {
    process.env.NODE_ENV = 'test';
})

test('GET homes information list successfully', async () => {
    const res = await request(app).get('/homes/?query=janest');
    const response = [
        { address: '123 Jane St', geolocation: { lat: 1, lng: 1 } }
    ]
    // stub algolia client
    expect(res.status).toBe(200);
    expect(res.body).toEqual(response);
});

test('GET homes information data no query', async () => {
    const res = await request(app).get('/homes/');
    expect(res.status).toBe(400);
});

test('POST homes information data', async () => {
    const res = await request(app).get('/homes/?query=janest');
    const response = [
        { address: '123 Jane St', geolocation: { lat: 1, lng: 1 } }
    ]
    expect(res.status).toBe(200);
    expect(res.body).toEqual(response);
});


test('POST homes information data', async () => {
    const res = await request(app).get('/homes/?query=janest');
    const response = [
        { address: '123 Jane St', geolocation: { lat: 1, lng: 1 } }
    ]
    expect(res.status).toBe(200);
    expect(res.body).toEqual(response);
});