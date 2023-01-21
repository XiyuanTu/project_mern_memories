export default (state = {posts: [], isLoading: true}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return {...state, isLoading: true}
        case 'END_LOADING':
            return {...state, isLoading: false}
        case 'LIKE':
        case 'UPDATE': 
        case 'COMMENT':
            return {...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)}
        case 'DELETE':
            return {...state, posts: state.posts.filter(post => post._id !== action.payload)}
        case 'FETCH_ALL':
            return {...state, ...action.payload}
        case 'FETCH_POST':
            return {...state, post: action.payload}
        case 'FETCH_SEARCH':
            return {...state, ...action.payload}
        case 'CREATE':
            return {...state, posts: [...state.posts, action.payload]}
        default:
            return state
    }
}

