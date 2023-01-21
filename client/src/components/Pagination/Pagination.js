
import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';

import useStyles from './styles';

const Paginate = ({page, title, tags}) => {
  page = Number(page) || 1
  const classes = useStyles();

  const dispatch = useDispatch()
  const {count} = useSelector(state => state.posts)

  const isSearching = useLocation().pathname.includes('search')
  
  useEffect(() => {
    page && (isSearching ? dispatch(getPostsBySearch({page, title, tags})) : dispatch(getPosts(page)))
  }, [dispatch, page])

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={count}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts${isSearching ? '/search' : ''}?page=${item.page}${isSearching ? `&title=${title}&tags=${tags.join(',')}` : ''}`} />
      )}
    />
  );
};

export default Paginate;