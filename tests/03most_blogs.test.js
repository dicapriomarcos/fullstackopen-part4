const { test, describe } = require('node:test')
const assert = require('node:assert')
const { mostBlogs } = require('../utils/list_helper')
const { multipleBlogs, uniqueBlog } = require('../utils/test_data')

describe('Most blogs test', () => {
    test('when list has only one blog, equals the author of that blog', () => {
  
        const testAuthor = 'Michael Chan'
        const result = mostBlogs(uniqueBlog)

        assert.deepStrictEqual(result, { author: testAuthor, blogs: 1 })
    })
  
  
    test('when list has multiple blogs, equals the author with most blogs', () => {
    
      const testAuthor = 'Robert C. Martin'
      const result = mostBlogs(multipleBlogs)
      assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
    })
    
  })