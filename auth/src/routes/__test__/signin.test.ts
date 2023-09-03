import request from 'supertest';
import { app } from '../../app';

it('Fails when a email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'sachin@gmail.com',
            password: 'password'
        })
        .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'sachin@gmail.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'sachin@gmail.com',
            password: 'password1'
        })
        .expect(400);
});

it('Response with a cookie when give valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'sachin@gmail.com',
            password: 'password'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'sachin@gmail.com',
            password: 'password'
        })
        .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
});
