import { combineReducers } from "redux";
import posts from './posts'
import auth from "./auth";
import id from './id'

export default combineReducers({
    posts, id, auth
})