const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { readJsonFile, writeJsonFile } = require("./fsUtils");

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // logging middleware

// TODO: multer implementieren für image upload
// TODO: validierung einbinden
// TODO: Layered architecture umsetzen
// TODO: error handling implementieren

// read blog content
app.get("/api/data", async (req, res) => {
    const postTag = req.query.tag;
    const userId = req.query.userID;
    const blogPosts = await readJsonFile("./posts.json");
    
    const filteredPosts = blogPosts.filter((post) => {
        if(postTag === undefined){
            return true;
        } else {
            return post.tags.includes(postTag);
        }
    }).filter((post) => {
        if(userId === undefined){
            return true;
        } else {
            return post.userId.toString() === userId;
        }
    });

    res.json(filteredPosts);
});

// read user data
app.get("/api/userData", async (_, res) => {
    const userData = await readJsonFile("./users.json");
    res.json(userData);
});

// create new content
app.post("/api/data/post", async (req, res) => {
    const newPostTitle = req.body.title;
    const newPostBody = req.body.body;
    const newPostTags = req.body.tags;
    console.log("Title:", newPostTitle, "Body:", newPostBody, "Tags:", newPostTags);

    const newPost = {
	    id: Date.now(),
		title: newPostTitle,
		body: newPostBody,
		userId: Date.now(),
		tags: ["history", "american", "crime"],
		reactions: 0    
    }

    const allPosts = await readJsonFile("./posts.json");
    console.log(allPosts);
    const updatedBlogContent = [...posts, newPost];
    await writeJsonFile("./posts.json", updatedBlogContent);
    res.json(updatedBlogContent);
});

// update blog content (add reactions)
app.patch("/api/data/addReaction/:postID", async (req, res) => {
    const postID = req.params.postID;
    console.log(req.method, req.url, req.params.postID);

    const blogPosts = await readJsonFile("./posts.json");
    const updatedBlogContent = blogPosts.map((post) => post.id.toString() === postID ? {
        ...post, reactions: Number(post.reactions) + 1
    } : post);
    await writeJsonFile("./posts.json", updatedBlogContent);
    res.json(updatedBlogContent);
});

// delete blog content
app.delete("/api/data/delete/:postID", async (req, res) => {
    const postID = req.params.postID;

    const blogPosts = await readJsonFile("./posts.json");
    const updatedBlogContent = blogPosts.filter((post) => post.id.toString() !== postID);

    await writeJsonFile("./posts.json", updatedBlogContent);
    res.json(updatedBlogContent);
});

app.listen(PORT, () => console.log("Server is listening at port: ", PORT));