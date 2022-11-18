const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map((blog) => blog.likes)
    const reducer = (total, curr) => {
        return total + curr
    }

    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map((blog) => blog.likes))
    const favorite = blogs.find((blog) => blog.likes === mostLikes)

    if (blogs.length === 0) {
        return 'No blogs in list.'
    } else {
        return {
            title: favorite.title,
            author: favorite.author,
            likes: favorite.likes
        }
    }
}

const mostBlogs = (blogs) => {
    const authors = new Set()
    blogs.forEach((blog) => {
        authors.add(blog.author)
    })
    const blogsPerAuthor = []
    authors.forEach((author) =>
        blogsPerAuthor.push({
            author: author,
            blogs: blogs.filter((obj) => obj.author === author).length
        })
    )
    const maxBlogs = Math.max(...blogsPerAuthor.map((obj) => obj.blogs))
    return blogsPerAuthor.find((obj) => obj.blogs === maxBlogs)
}

const mostLikes = (blogs) => {
    const reducer = (total, curr) => {
        return total + curr
    }
    const authors = new Set()
    blogs.forEach((blog) => authors.add(blog.author))
    const likesPerAuthor = []
    authors.forEach((author) =>
        likesPerAuthor.push({
            author: author,
            likes: blogs
                .filter((blog) => blog.author === author)
                .map((blog) => blog.likes)
                .reduce(reducer, 0)
        })
    )
    const maxLikes = Math.max(...likesPerAuthor.map((obj) => obj.likes))
    return likesPerAuthor.find((obj) => obj.likes === maxLikes)
}

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

module.exports = { dummy, totalLikes, favoriteBlog }
