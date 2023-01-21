export default (id = null, action) => {
    switch (action.type) {
        case 'SAVE':
            return action.payload
        case 'CLEAR':
            return null
        default:
            return id
    }
} 

   