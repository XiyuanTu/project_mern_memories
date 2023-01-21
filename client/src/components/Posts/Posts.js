import React, {useState, useEffect} from 'react'
import Post from './Post/Post.js'
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

export default function Posts() {
  const classes = useStyles()
  const {posts, isLoading} = useSelector(state => state.posts)

  const [postz, setPosts] = useState([])
  
  useEffect(() => {
    setPosts(posts)
  }, [posts])

  if (postz.length === 0 && !isLoading) {
    return 'No posts found'
  } 

  return (
    isLoading ? <CircularProgress/> : (
      <Grid className={classes.container} container alignItems='stretch' spacing={3} >
        {postz.map(post => (
          <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
            <Post post={post} setPosts={setPosts}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}
