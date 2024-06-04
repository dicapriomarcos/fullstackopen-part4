const { test, describe } = require('node:test')
const assert = require('node:assert')
const { totalLikes } = require('../utils/list_helper')
const { multipleBlogs, uniqueBlog } = require('../utils/test_data')

describe('total likes test', () => {
 
    test('when list has only one blog, equals the likes of that', () => {
      const result = totalLikes(uniqueBlog)
      assert.strictEqual(result, 7)
    })
  
    test('when list has multiple blogs, equals the likes of all', () => {

      const result = totalLikes(multipleBlogs)
      assert.strictEqual(result, 36)
    } )   
  
})