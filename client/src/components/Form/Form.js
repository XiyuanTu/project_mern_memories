import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import useStyles from './styles.js';
import { createPost, updatePost } from '../../actions/posts.js'; 
import {clearCurrentId} from '../../actions/id'
import { useNavigate } from 'react-router-dom';

export default function Form() {

  const navigate = useNavigate()

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })

  const currentId = useSelector(state => state.id)


  const post = useSelector(state => currentId ? state.posts.posts.find(post => currentId === post._id) : null)

  const dispatch = useDispatch()

  useEffect(() => {post && setPostData(post)}, [dispatch])

  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user'))?.result
    if (user) {
      currentId ? dispatch(updatePost(currentId, postData)) : dispatch(createPost({...postData, creator: user.id, name: user.name}))
    } else {
      navigate('/auth')
    }
    
    clear()
  }

  const clear = () => {
    setPostData({title: '', message: '', tags: '', selectedFile: ''})
    dispatch(clearCurrentId())
  } 

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{`${currentId ? 'Editing' : 'Creating'} a Memory`}</Typography>
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={e => setPostData({...postData, title : e.target.value})} />
        <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={e => setPostData({...postData, message : e.target.value})} />
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={e => setPostData({...postData, tags : e.target.value.split(',')})} />
        <div className={classes.fileInput}><FileBase type='file' mutiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/></div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button> 
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button> 
      </form>
    </Paper>
    
  )
}
