const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { multipleBlogs, uniqueBlog } = require('../utils/test_data')

describe('total likes', () => {
 
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(uniqueBlog)
      assert.strictEqual(result, 7)
    })
  
    test('when list has multiple blogs, equals the likes of all', () => {
  
      const result = listHelper.totalLikes(multipleBlogs)
      assert.strictEqual(result, 36)
    } )   
  
})