
// Dummy test
const dummy = (blogs) => {
    
    return 1;
}

// Total likes test
const totalLikes = (blogs) => {

    const totalLikes = blogs.reduce((accumulator, blog) => {
        return accumulator + blog.likes;
    }, 0);

    console.log('The total likes of', blogs.length, 'blogs is:', totalLikes, 'likes');
    return totalLikes;
}

// Favorite blog test
const favoriteBlog = (blogs) => {

    let favorite;

    blogs.map(blog => {
        if (!favorite || blog.likes > favorite.likes) {
            favorite = blog;
        }
    });

    console.log('The Favorite blog of' ,blogs.length, 'blogs is:' , favorite.title, 'and has', favorite.likes, 'likes');
    return favorite;
}

// Most blogs test
const mostBlogs = (blogs) => {
   
    const authors = [];
    
    blogs.map( blog => {

        const index = authors.findIndex(  author => author.author === blog.author)

        if ( index === -1) {
            authors.push({ author: blog.author, blogs: 1 })
        } else {
            authors[index].blogs++
        }

    })

    const sortedAuthors = authors.sort((a, b) => b.blogs - a.blogs)

    console.log('Author with more blogs: ', sortedAuthors[0])

    return sortedAuthors[0];
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}