import request from 'supertest';
import { app } from '../../app';

it('Returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'sachin@gmail.com',
            password: 'Test@123'
        })
        .expect(201);
});

it('Returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'wefijweif343434',
            password: 'Test3223123'
        })
        .expect(400);
});

it('Returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'sachin@gmail.com',
            password: 'd'
        })
        .expect(400);
});

it('Returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'sacin@gmail.com'
        })
        .expect(400);

    return request(app)
        .post('/api/users/signup')
        .send({
            password: 'wtgjkgf23'
        })
        .expect(400);
});

it('DisAllows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'Sachin@gmail.com',
            password: 'wtgjkgf23'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'Sachin@gmail.com',
            password: 'wtgjkgf23'
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'Sachin@gmail.com',
            password: 'wtgjkgf23'
        })
        .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
});
