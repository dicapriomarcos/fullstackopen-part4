const app = require('../app');

const mongoose = require('mongoose');
const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert');
const supertest = require('supertest');
const User = require('../models/user');
const api = supertest(app);
const { MultipleUsers, oneUser } = require('../utils/test_data')

beforeEach(async () => {

    // clear database
    await User.deleteMany({})

    // reset database to 3 items
    const usersObject = MultipleUsers.map( user => new User(user))
    const promiseArray = usersObject.map(user => user.save())
    await Promise.all(promiseArray)
    
})

test('create a new user', async () => {

    const originalUsers = await api.get('/api/users')

    const singleUser = oneUser
    
    await api.post('/api/users')
    .send(singleUser[0])
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const allUsers = await api.get('/api/users')

    assert.strictEqual(allUsers.body.length, originalUsers.body.length + 1)
})

after(async () => {
    await mongoose.connection.close();
});