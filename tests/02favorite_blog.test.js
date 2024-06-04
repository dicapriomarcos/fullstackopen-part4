const { test, describe } = require('node:test')
const assert = require('node:assert')
const { favoriteBlog } = require('../utils/list_helper')
const { multipleBlogs, uniqueBlog } = require('../utils/test_data')

describe('favorite blogs test', () => {

  test('when list has only one blog, equals the blog itself', () => {
    const result = favoriteBlog(uniqueBlog)
    assert.deepStrictEqual(result, uniqueBlog[0])
  })  

  test('when list has multiple blogs, equals the blog with most likes', () => {
    const result = favoriteBlog(multipleBlogs)
    assert.deepStrictEqual(result, multipleBlogs[2])
  })
})