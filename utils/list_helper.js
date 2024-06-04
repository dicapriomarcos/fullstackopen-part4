const dummy = (blogs) => {
  
    if(blogs){
      return 1;
    }else{
      return 0;
    }
  
  }
  
  const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
      return sum + item.likes;
    }
  
    return blogs.reduce(reducer, 0);
  }
  
  const favoriteBlog = (blogs) => {
    const reducer = (max, item) => {
      return max.likes > item.likes ? max : item;
    }
  
    return blogs.reduce(reducer, blogs[0]);
  }
  
  const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author);
    const authorCount = authors.reduce((acc, author) => {
      acc[author] = (acc[author] || 0) + 1;
      return acc;
    }, {});
  
    const authorWithMostBlogs = Object.keys(authorCount).reduce((max, author) => {
      return authorCount[author] > authorCount[max] ? author : max;
    });
  
    return {  author: authorWithMostBlogs, blogs: authorCount[authorWithMostBlogs] };
  }
  
  
  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
  }