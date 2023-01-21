import express from "express";
import { getPosts, getPostsBySearch, createPost, updatePost, deletePost, updateLike, getPost, commentPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router()

router.get('/search', getPostsBySearch)

router.route('/')
    .get(getPosts)
    .post(auth, createPost)

router.route('/:id')
    .get(getPost)
    .patch(auth, updatePost)
    .delete(auth, deletePost)

router.patch('/like/:id', auth, updateLike)

router.post('/:id/commentPost', auth, commentPost)

export default router