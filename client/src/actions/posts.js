import * as api from '../api'

export const getPosts = page => async(dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data} = await api.fetchPosts(page)
        dispatch({type: 'FETCH_ALL', payload: data})
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
    }
}

export const getPost = id => async(dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data} = await api.fetchPost(id)
        dispatch({type: 'FETCH_POST', payload: data})
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
    }
}

export const getPostsBySearch = search => async(dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data} = await api.fetchPostsBySearch(search)
        dispatch({type: 'FETCH_SEARCH', payload: data})
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = post => async(dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data} = await api.createPost(post)
        dispatch({type: 'CREATE', payload: data})
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {data} = await api.updatePost(id, post)
        dispatch({type: 'UPDATE', payload: data})
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = id => async(dispatch) => { 
    try {
        dispatch({type: 'START_LOADING'})
        await api.deletePost(id)
        dispatch({type: 'DELETE', payload: id})
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
    }
}

export const updateLike = id => async(dispatch) => {
    try {
        const {data} = await api.updateLike(id)
        dispatch({type: 'LIKE', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const commentPost = ({commentInfo, postId}) => async(dispatch) => {
    try {
        const {data} = await api.commentPost(commentInfo, postId)
        dispatch({type: 'COMMENT', payload: data})
        return data.comments
    } catch (error) {
        console.log(error.message)
    }
}


