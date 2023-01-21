import React from 'react';
import {Navigate} from 'react-router-dom'

import Home from '../components/Home/Home'
import Auth from '../components/Auth/Auth'
import PostDetails from '../components/PostDetails/PostDetails'

const user = JSON.parse(localStorage.getItem('user'))?.result

export const routes = [
    {
        path: "/posts",
        element: <Home/>,
        children: [
            {
                path: "search",
                element: <Home/>
            }
        ]
    },
    {
        path: "/posts/:id",
        element: <PostDetails/>
    },
    {
        path: "/auth",
        element: user ? <Navigate to="/posts"/> : <Auth/>
    },
    {
        path: "/",
        element: <Navigate to="/posts"/>
    }
]
