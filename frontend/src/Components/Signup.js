import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { IconButton, InputAdornment, Button, Box, Typography, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [emailerr, setEmailerr] = useState('');
    const [usererr, setUsererr] = useState('');
    const [passerr, setPasserr] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!(!!emailerr || !!passerr || !!usererr )) {
            axios.post("http://localhost:8000/user", { username, email, password })
                .then((res) => {
                    navigate('/loginu');
                })
                .catch((err) => setError('Account creation failed'))
        }
    }
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const validateEmail = () => {
        if (!/\S+@\S+\.\S+/.test(email))
            setEmailerr('Invalid email id');
        else {
            const credential = email;
            axios.post(`http://localhost:8000/signup`, { credential })
                .then((res) => {
                    if (res.data === 'valid') { setEmailerr(''); }
                    else { setEmailerr('Email aldready exists'); }
                })
                .catch(err => { console.log(err);setError('Internal Server error'); })
        }
    };
    const validateUsername = () => {
        if (username.length > 10)
            setUsererr('Username should be atmost 10 characters');
        else if (!/^[a-zA-Z0-9]+$/.test(username))
            setUsererr('Username can have only Alphabets and numbers');
        else {
            const credential = username;
            axios.post(`http://localhost:8000/signup`, { credential })
                .then((res) => {
                    if (res.data === 'valid') { setUsererr(''); }
                    else { setUsererr('Username aldready exists'); }
                })
                .catch(err => { console.log(err);setError('Internal Server error'); })
        }

    };
    const validatePassword = () => {
        if (password.length < 6)
            setPasserr('Password should be atleast 6 characters');
        else if (password.length > 10)
            setPasserr('Password should be atmost 10 characters');
        else if (/\s/.test(password))
            setPasserr('Password should not have whitespace character')
        else
            setPasserr('');
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
            <Typography variant='h3' sx={{ textAlign: 'center' }}>SIGN UP</Typography>
            <Box sx={{
                border: '3px solid grey', padding: '10px', width: '90%', maxWidth: '100vh'
            }}>
                {error &&
                    <Typography variant='body2' color='error' sx={{ textAlign: 'center' }}>{error}</Typography>
                }
                <form onSubmit={handleSubmit}>
                    <Typography variant='h5' type='email'>Email<br /></Typography>
                    <TextField fullWidth required variant='filled' label='Email' onChange={e => { setEmailerr(''); setEmail(e.target.value) }} onBlur={e => { validateEmail(); }} error={!!emailerr} helperText={emailerr}></TextField>
                    <Typography variant='h5'>Username<br /></Typography>
                    <TextField fullWidth required variant='filled' label='Username' onChange={e => { setUsererr(''); setUsername(e.target.value) }} onBlur={e => { validateUsername(); }} error={!!usererr} helperText={usererr}></TextField>
                    <Typography variant='h5' type='password'>Password<br /></Typography>
                    <TextField
                        fullWidth required variant="filled" label="Password" onChange={e => { setPasserr(''); setPassword(e.target.value) }} onBlur={e => { validatePassword(); }} error={!!passerr} helperText={passerr}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ textAlign: 'center' }}>
                        <Button variant='contained' style={{ marginTop: '10px', backgroundColor: 'white', color: 'black', display: 'inline-block' }} type='submit'>Submit</Button>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant='body1'><Link style={{ color: 'inherit' }} to='/loginu'>Aldready have an account?</Link></Typography>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default Signup