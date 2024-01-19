import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef } from 'react';
import { errorToast } from './error';
import axios from "axios"
import {useNavigate} from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();




export default function SignUp() {

const navigate=useNavigate();
const firstNameRef=React.useRef();
const lastNameRef=React.useRef();
const emailNameRef=React.useRef();
const passwordNameRef=React.useRef();


  const handleSubmit=async(event)=>{
event.preventDefault();

// console.log(firstNameRef.current.value);
// console.log(lastNameRef.current.value);
// console.log(emailNameRef.current.value);
// console.log(passwordNameRef.current.value);


const firstNamevalue=firstNameRef.current.value
const lastNamevalue=lastNameRef.current.value
const emailNamevalue=emailNameRef.current.value
const passwordNamevalue=passwordNameRef.current.value

const patternForm=/^[a-zA-Z\s]+$/
const emailForm=/^[a-z0-9]+@[a-z]+.[a-z]{2,3}$/
const passwordForm=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/

// console.log(firstNamevalue.length>3 && firstNamevalue.length<16,"frstnamevalue");

if (firstNamevalue==="") {
  errorToast("frstname is required")
  return false
}
if (!(firstNamevalue.length>=3 && firstNamevalue.length <=16)) {
  errorToast("frstname should be between 3 and 16")
    return false
} 
if (!(patternForm.test(firstNamevalue))) {
  errorToast("nmbers or special character are not allowed")
  return false
}

if (lastNamevalue==="") {
  errorToast("lastname is required")
  return false
}
if (!(lastNamevalue.length >=1 && lastNamevalue.length <=5)) {
  errorToast("frstname should be between 1 and 5")
    return false
}
if (emailNamevalue==="") {
  errorToast("email is required")
  return false
}
if (!(emailForm.test(emailNamevalue))) {
  errorToast("invalid email")
  return false
}

if (passwordNamevalue==="") {
  errorToast("password is required")
  return false
}  
if (!(passwordForm.test(passwordNamevalue))) {
  errorToast("Minimum eight characters, at least one letter, one number and one special character")
  return false
}

const data={
  firstName:firstNamevalue,
  lastName:lastNamevalue,
  email:emailNamevalue,
  password:passwordNamevalue
}

try {
  await axios.post('http://localhost:3000/api/register',data)
  navigate('/signinside')
} catch (error) {
  console.log(error.message);
}

  }
  ;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  inputRef={firstNameRef}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  inputRef={lastNameRef}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  inputRef={emailNameRef}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  inputRef={passwordNameRef}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}