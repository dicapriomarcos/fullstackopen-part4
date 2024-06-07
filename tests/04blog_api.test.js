const app = require('../app');

const mongoose = require('mongoose');
const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert');
const supertest = require('supertest');
const { multipleBlogs, uniqueBlog } = require('../utils/test_data')
const Blog = require('../models/blog');
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

describe('save new blog', () => {

    test('save a single blog', async () => {

        const singleBlog = uniqueBlog;
        singleBlog[0].title = 'Save a single blog';   

        await api.post('/api/blogs')
        .send(singleBlog[0])
        .expect(201)
    
        const response = await api.get('/api/blogs');
        assert.strictEqual(response.body.length, multipleBlogs.length + 1);
    });

    test('save blog with likes default 0', async () => {

        const blogWithoutLikes = uniqueBlog;
        delete blogWithoutLikes[0].likes;

        const response = await api.post('/api/blogs')
        .send(blogWithoutLikes[0])
  
        assert.strictEqual(response.body.likes,0);
    })

    test('title and url not exist response 400', async () => {

        const blogWithoutTitleAndUrl = uniqueBlog;
        delete blogWithoutTitleAndUrl[0].title;
        delete blogWithoutTitleAndUrl[0].url;

        const response = await api.post('/api/blogs')
        .send(blogWithoutTitleAndUrl[0])
  
        assert.strictEqual(response.status,400);
    })
});

test('delete a blog with ID', async () => {

    const blogs = await api.get('/api/blogs');
    const id = blogs.body[0].id;

    await api.delete(`/api/blogs/${id}`)
    .expect(204)
  
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, multipleBlogs.length - 1);
});

test('update likes of a blog', async () => {
    const blogs = await api.get('/api/blogs');
    const testBlog = blogs.body[0];
    const id = testBlog.id;

    const olderLikes = testBlog.likes;
    const updatedBlog = { ...testBlog, likes: olderLikes + 1 };

    const addLikesToBlog = await api.put(`/api/blogs/${id}`)
        .send(updatedBlog)
        .expect(200);

    console.log(`The Old Version of Blog has ${olderLikes} likes`);
    console.log(`The New Version of Blog has ${addLikesToBlog.body.likes} likes`);

    assert.strictEqual(addLikesToBlog.body.likes, olderLikes + 1);
});


after(async () => {
await mongoose.connection.close();
});