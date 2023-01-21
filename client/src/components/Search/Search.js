import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import useStyle from './styles'
import { getPostsBySearch } from '../../actions/posts';
 
export default function Search () {
    const classes = useStyle()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [search, setSearch] = useSearchParams()
    const [title, setTitle] = useState(search.get('title') || '')
    const [tags, setTags] = useState(search.get('tags') ? search.get('tags').split(',') : [])

    
    const searchPost = () => {
        if (title.trim() || tags.length > 0) {
          dispatch(getPostsBySearch({title, tags, page: search.get('page')}))
          navigate(`/posts/search?title=${title || 'none'}&tags=${tags.join(',')}`)
        } 
      } 


    const handleKeyPress = e => e.keyCode === 13 && searchPost()
    const handleAddChip = tag => setTags([...tags, tag])
    const handleDeleteChip = tagToDelete => setTags(tags.filter(tag => tag !== tagToDelete))
  return (
    <AppBar className={classes.appBarSearch} position="static" color="inherit">
        <TextField onKeyPress={handleKeyPress} name="search" variant="outlined" label="Search Titles" fullWidth value={title || ''} onChange={e => setTitle(e.target.value)} />
        <ChipInput
        style={{ margin: '10px 0' }}
        value={tags}
        onAdd={handleAddChip}
        onDelete={handleDeleteChip}
        label="Search Tags"
        variant="outlined"
        />
        <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
    </AppBar>
  )
}
