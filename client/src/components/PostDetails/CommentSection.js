import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({post}) => {
  const dispatch = useDispatch()
  const commentsRef = useRef()
  const classes = useStyles()
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))?.result

  const handleComment = async() => {
    const comments = await dispatch(commentPost({commentInfo: {name: user.name, comment}, postId: post._id}))
    setComments(comments)
    setComment('')

    commentsRef.current.scrollIntoView({behavior: 'smooth'  })
  }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          
            {comments?.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{c.name}: </strong>{c.comment}
              </Typography>
              
            ))}
            <div ref={commentsRef} />

          
        </div>
        {
          user && (
            <div style={{ width: '70%' }}>
              <Typography gutterBottom variant="h6">Write a comment</Typography>
              <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
              <br />
              <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                Comment
              </Button>
            </div>
          )
        }
        
      </div>
    </div>
  )
}

export default CommentSection