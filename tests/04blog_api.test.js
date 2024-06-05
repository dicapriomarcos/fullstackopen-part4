const app = require('../app');

const mongoose = require('mongoose');
const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert');
const supertest = require('supertest');
const { multipleBlogs, uniqueBlog } = require('../utils/test_data')
const Blog = require('../models/Blog');
const api = supertest(app);

beforeEach(async () => {

    // clear database
    await Blog.deleteMany({})

    // reset database to 6 items
    const blogObjects = multipleBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

  })

test('obtains blogs', async () => {
    await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('obtain 6 items', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, multipleBlogs.length);
});

test('id of blogs is id not _id', async () => {
    const response = await api.get('/api/blogs');

    assert.ok( response.body[0].id, ['id key not exist'] )
});

test('save new blog', async () => {
    await api.post('/api/blogs')
    .send(uniqueBlog)
    .expect(201)

    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, multipleBlogs.length + 1);
});

describe('save new blog', () => {
    test('save a single blog', async () => {
        await api.post('/api/blogs')
        .send(uniqueBlog)
        .expect(201)
    
        const response = await api.get('/api/blogs');
        assert.strictEqual(response.body.length, multipleBlogs.length + 1);
    });

    test('save blog with likes default 0', async () => {

        const testBlog = uniqueBlog;
        delete testBlog[0].likes;

        console.log('Test Blog: ',testBlog);

        const response = await api.post('/api/blogs')
        .send(testBlog[0])
  
        assert.strictEqual(response.body.likes,0);
    })
});


after(async () => {
await mongoose.connection.close();
});