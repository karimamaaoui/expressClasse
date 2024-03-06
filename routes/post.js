const express=require ('express')
const router=express.Router();
const Post =require('../models/post');
const { exists } = require('../models/user');
const authenticate = require('../middleware/authenticate');

//add new post
router.post('/add',authenticate, async (req, res) => {
    try {
        const { title,description } = req.body;

        // Validate title and description is null
        if (!title,!description) {
            return res.status(400).json({ error: 'Field is required' });
        }

        // Create a new post 
        const newPost = new Post({
            title,
            description,
            author: req.userId
        });

        // Save the post to the database
        await newPost.save();

        res.status(201).send( 'Post added successfully' );
    } catch (error) {
        console.error(error);
        res.status(500).send( error.message);
    }
});


//get list of posts
router.get('/list', async (req, res) => {
    try {
        // Fetch all posts from the database
        const posts = await Post.find();

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    }
});

// get post by id
router.get('/get/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const postExist = await Post.findById(postId);
        if (!postExist) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(postExist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//delete post by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const postId = req.params.id;

        // get post from db by id
        const existingPost = await Post.findById(postId);

        if (!existingPost) {
            return res.status(404).send('post not found');
        }

        await existingPost.deleteOne({_id: postId});
        res.status(200).send('post deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

//update 
router.put('/update/:id', async (req, res) => {
    try {
        const postId = req.params.id;

        // Fetch the post from the database by ID
        const existingPost = await Post.findById(postId);
        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Update the existing post 
        existingPost.description = req.body.description; 

        // Save the updated post to the database
        const updatedPost = await existingPost.save();

        res.status(200).json({ message: 'post updated successfully', updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

      
module.exports = router;
