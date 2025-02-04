const { faker } = require("@faker-js/faker")
const Post = require("../models/Post")

const CreatePosts = async () =>{
    for(i = 0; i <= 100; i++) {
        const post = new Post({
            thumbnail: "uploads/1708680566042-466953621-Screenshot2024-01-03202541.png",
            title: faker.lorem.lines(1),
            content: faker.lorem.lines(10),
            categoryId: "65d85ee011f177766aba431b",
            status: "published",
            userId: "65d70b26b7a1fd446a89a9f2",
        })
        await post.save()
        console.log(`Post Created: ${post.title}`)
    }
}

module.exports = CreatePosts