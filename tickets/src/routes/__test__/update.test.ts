import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('Returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'Some title',
            price: 30
        })
        .expect(404);
});

it('Returns a 401 if the use is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'Some title',
            price: 30
        })
        .expect(401);
});

it('Returns a 401 if the use does not own the ticket', async () => {
    const response = await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: 'Some',
        price: 30
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'New title',
            price: 100
        })
        .expect(401);
});

it('Returns a 400 if the user provides an invaild title or price', async () => {
    const cookie = global.signin();
    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title: 'Some',
        price: 30
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 30
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'New Title',
            price: -30
        })
        .expect(400);
});

it('Updates the ticket provided valid inputs', async () => {
    const cookie = global.signin();
    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title: 'Some',
        price: 30
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'New Title',
            price: 300
        })
        .expect(200);

    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send();

    expect(ticketResponse.body.title).toEqual('New Title');
    expect(ticketResponse.body.price).toEqual(300);
});
