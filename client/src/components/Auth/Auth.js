import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { googleLogout, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import jwt_code from 'jwt-decode'

import Icon from './icon';
import Input from './Input';
import useStyles from './styles.js'
import { signup, signin } from '../../actions/auth';

const initialFormData = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

export default function Auth() {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }

  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const switchMode = () => setIsSignup(isSignup => !isSignup)


  const handleShowPassword = () => setShowPassword(showPassword => !showPassword)


  const loginSuccess = async(response) => {
    try {

      const {name, email, picture, sub} = jwt_code(response.credential)
      const result = {name, email, picture, id : sub}
      dispatch({type:'AUTH', data: {result, token: response.credential}})
      navigate('/')
    } catch (error) {
      console.log(error)
    }
      
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          {/* <Button onClick={login} className={classes.googleButton} color="primary" fullWidth startIcon={<Icon />} variant="contained">
                Google Sign In
          </Button> */}
        
          <GoogleLogin 
              onSuccess={loginSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            />

          <Grid container justifyContent="flex-end" >
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
