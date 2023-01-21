import React, {useState} from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import {saveCurrentId} from '../../../actions/id'
import { deletePost, updateLike } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';

export default function Post({post, setPosts}) {
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem('user'))?.result
  const location = useLocation()

  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(user && post.likes.find(id => id == user.id))

  const dispatch = useDispatch()

  const navigate = useNavigate()

  

  const handleUpdate = e => {
    dispatch(saveCurrentId(post._id))
    e.stopPropagation()
  }


  const deletePostById = () => {
    if (window.confirm(`Are you sure you want to delete the post titled: ${post.title}`)) {
      setPosts(posts => posts.filter(item => item._id != post._id))
      dispatch(deletePost(post._id))
      navigate(location.pathname + location.search)
    }
  }

  const Likes = () => {
    if (likeCount > 0) {
      return (
        <>
          { user && isLiked ? 
            <><ThumbUpAltIcon fontSize='small'/>&nbsp;{likeCount > 2 ? `You and ${likeCount - 1} others` : `${likeCount} like${likeCount > 1 ? 's' : ''}` }</>:
            <><ThumbUpAltOutlinedIcon fontSize='small'/>&nbsp;{likeCount}Like{likeCount === 1 ? '' : 's'}</>
          }
        </>
      )
    }
    return <><ThumbUpAltOutlinedIcon fontSize='small'/>&nbsp;Like</>
  }

  const handleLike = () =>{
    if (user) {
      setIsLiked(!isLiked)
      isLiked ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
      dispatch(updateLike(post._id))
    } else {
      navigate('/auth')
    }
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase component="span"  name="test" className={classes.cardAction} onClick={() => navigate(`/posts/${post._id}`)}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {
          post.creator == user?.id ?
          <Button style={{color: 'white'}} size='small' onClick={handleUpdate}>
            <MoreHorizIcon fontSize='medium'/>
          </Button>
          :<></>
        }
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map(tag => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography className={classes.message} variant='body2' color='textSecondary'>{post.message}</Typography>
      </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' onClick={handleLike}>
          <Likes/>
        </Button>
        <Button size='small' color='primary'  onClick={deletePostById}>
          {
            post.creator == user?.id ? <><DeleteIcon fontSize='small'/>Delete</> : <></>
          }
          
        </Button>
      </CardActions>
    </Card>
  )
}
