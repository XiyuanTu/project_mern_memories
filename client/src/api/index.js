import axios from 'axios'

const API = axios.create({ baseURL: 'https://memories-xy.herokuapp.com' });

API.interceptors.request.use(req => {
    if (localStorage.getItem('user')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    }
    
    return req;
})

export const fetchPosts = page => API.get(`/posts?page=${page}`)
export const fetchPost = id => API.get(`/posts/${id}`)
export const fetchPostsBySearch = ({title, tags, page}) => API.get(`/posts/search?title=${title || 'none'}&tags=${tags.join(',')}&page=${page}`)
export const createPost = newPost => API.post('/posts', newPost)
export const commentPost = (commentInfo, id) => API.post(`/posts/${id}/commentPost`, commentInfo)
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post)
export const deletePost = id => API.delete(`/posts/${id}`)

export const updateLike = id => API.patch(`/posts/like/${id}`)

export const signup = formData => API.post('/user/signup', formData)
export const signin = formData => API.post('/user/signin', formData)

