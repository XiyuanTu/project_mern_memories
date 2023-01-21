import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import memoriesText from '../../images/memoriesText.png';
import memoriesLogo from '../../images/memoriesLogo.png';

import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { clearCurrentId } from '../../actions/id';

export default function Navbar() {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
      dispatch({type: 'LOGOUT'})
      navigate(0)
      setUser(null)
    }

    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('user'))?.result)
    }, [localStorage.getItem('user')])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to='/' className={classes.brandContainer}>
        <img  src={memoriesText} alt="icon" height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.name} src={user.picture}/>
            <Typography className={classes.userName} variant="h6">{user.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
