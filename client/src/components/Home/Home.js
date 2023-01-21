import React, { useState } from 'react';
import {useSearchParams} from 'react-router-dom'

import { Container, Grow, Grid, Paper} from '@material-ui/core';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Search from '../Search/Search';

import Pagination from '../Pagination/Pagination';
import useStyle from './styles'

export default function Home() {
    const [search, setSearch] = useSearchParams()
    const [title, setTitle] = useState(search.get('title') || '')
    const [tags, setTags] = useState(search.get('tags') ? search.get('tags').split(',') : [])

    const classes = useStyle()

  return (
    <Grow in>
        <Container maxWidth='xl'>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Search/>
              <Form/>
              <Paper className={classes.pagination} elevation={6} >
                <Pagination page={search.get('page')} title={title} tags={tags}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
    </Grow>
  )
}
