
// Dummy test
const dummy = (blogs) => {
    
    return 1;
}

// Total likes test
const totalLikes = (blogs) => {

    const totalLikes = blogs.reduce((accumulator, blog) => {
        return accumulator + blog.likes;
    }, 0);

    return totalLikes;
}

// Favorite blog test
const favoriteBlog = (blogs) => {
    const reducer = (max, item) => {
      return max.likes > item.likes ? max : item;
    }
  
    const favorite = blogs.reduce(reducer, blogs[0]);
    console.log('Favorite :', favorite)
    return favorite;
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