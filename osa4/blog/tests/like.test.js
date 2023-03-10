const likes = require("../utils/functions")

describe("total likes", () => {
    const ls = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
        },
        {
        _id: '5a422aa71b54a676234d27f8',
        title: 'Go To Statement Considered Harmful 2',
        author: 'Edsger W. Dijkstra 3',
        url: 'http://www.u.arizona.edu//Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
        }
    ]

    const singleBlog = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
        }    
    ]


    test("list of blogs", () => {
        const result = likes.totalLikes(ls)
        expect(result).toBe(15)
    })

    test("single blog in list", () => {
        const result = likes.totalLikes(singleBlog)
        expect(result).toBe(5)
    })
})
