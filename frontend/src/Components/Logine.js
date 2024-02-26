import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { IconButton, InputAdornment, Button, Box, Typography, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useUser } from './UserContext';

const Logine = ({ checkAuth }) => {
    axios.defaults.withCredentials = true;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { loginuser } = useUser();

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const credential = email;
        if (/\S+@\S+\.\S+/.test(email)) {
            axios.post(`http://localhost:8000/login`, { credential, password })
                .then((res) => {
                    loginuser({ username: res.data })
                    checkAuth();
                    navigate(`/task`);
                })
                .catch(err => {
                    if (err.response.status === 404) setError('Invalid Email or Password');
                    else setError('Internal Server Error')
                })
        }
        else setError('Invalid Email or Password');
    }
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
            <Typography variant='h3' sx={{ textAlign: 'center' }}>LOGIN</Typography>
            <Box sx={{ border: '3px solid grey', padding: '10px', width: '90%', maxWidth: '100vh' }}>
                {error &&
                    <Typography variant='body2' color='error' sx={{ textAlign: 'center' }}>{error}</Typography>
                }
                <form onSubmit={handleSubmit}>
                    <Typography variant='h5'>Email<br /></Typography>
                    <TextField fullWidth required variant='filled' label='Email' onChange={e => { setError(''); setEmail(e.target.value); }}></TextField>
                    <Typography variant='h5' type='password'>Password<br /></Typography>
                    <TextField
                        fullWidth required variant="filled" label="Password" onChange={e => { setError(''); setPassword(e.target.value); }}
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
                        <Typography variant='body1'><Link style={{ color: 'inherit' }} to='/forgotpassword'>Forgot Password?</Link></Typography>
                        <Typography variant='body1'><Link style={{ color: 'inherit' }} to="/loginu">Login with username?</Link></Typography>
                        <Typography variant='body1'><Link style={{ color: 'inherit' }} to='/signup'>Create new account?</Link></Typography>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default Logine