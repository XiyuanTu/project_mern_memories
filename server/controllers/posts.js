import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPost = async (req, res) => {
    try {
        const {id} = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

        const postMessage = await PostMessage.findById(id)
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPosts = async (req, res) => {
    try {
        const LIMIT = 8
        let {page} = req.query
        page = Number(page)
        const startIndex = (page - 1) * LIMIT
        const total = await PostMessage.countDocuments({})
        const postMessages = await PostMessage.find().limit(LIMIT).skip(startIndex)
        res.status(200).json({posts: postMessages, count: Math.ceil(total / LIMIT)})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPostsBySearch = async (req, res) => {
    try {
        const LIMIT = 8
        let {title, tags, page} = req.query
        title = new RegExp(title, 'i')

        if (page) {
            page = Number(page)
            const startIndex = (page - 1) * LIMIT
            const total = await PostMessage.countDocuments({$or : [{title}, {tags : {$in : tags.split(',')}}]})
            const postMessages = await PostMessage.find({$or : [{title}, {tags : {$in : tags.split(',')}}]}).limit(LIMIT).skip(startIndex)
            res.status(200).json({posts: postMessages, count: Math.ceil(total / LIMIT)})
        } else {
            const postMessages = await PostMessage.find({$or : [{title}, {tags : {$in : tags.split(',')}}]})
            res.status(200).json({posts: postMessages})
        }
        
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage(post)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    const post = req.body
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})

    res.json(updatedPost)
}

export const commentPost = async (req, res) => {
    const { id } = req.params
    
    const commentInfo = req.body
    
    const post = await PostMessage.findById(id)
    post.comments.push(commentInfo)
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})
    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    await PostMessage.findByIdAndRemove(id)
    res.json({ message: "Post deleted successfully." });
}

export const updateLike = async (req, res) => {
    const { id : postId } = req.params
    const userId = req.userId

    if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send('No post with that id')

    const post = await PostMessage.findById(postId)
    const index = post.likes.findIndex(id => id == userId)
    if (index === -1) {
        post.likes.push(userId)
    } else {
        post.likes = post.likes.filter(id => id != userId)
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, { new: true });
    res.json(updatedPost)
}