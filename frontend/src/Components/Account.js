import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IconButton, InputAdornment, Button, Box, Typography, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUser } from './UserContext';

const Account = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [passerr, setPasserr] = useState('');
    const [msg, setMsg] = useState('');
    const { user } = useUser();
    const credential = user.username;
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!(!!passerr)) {
            axios.put(`http://localhost:8000/change`, { password, credential })
                .then(res => {
                    setPassword('');
                    setMsg('Password Changed');
                })
                .catch(err => {
                    setMsg('Password change failed');
                    setPassword('');
                })
        }
    }
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
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
            <Link to={'/task'}><Button variant='contained' style={{ position: 'absolute', backgroundColor: 'white', color: 'black', top: '10px', right: '10px' }}>BACK</Button></Link>
            <Typography variant='h3' sx={{ textAlign: 'center' }}>CHANGE PASSWORD</Typography>
            <Box sx={{
                border: '3px solid grey', padding: '10px', width: '90%', maxWidth: '100vh'
            }}>
                {msg &&
                    <Typography variant='body2' color='error' sx={{ textAlign: 'center' }}>{msg}</Typography>
                }
                <form onSubmit={handleSubmit}>
                    <Typography variant='h5' type='password'>Password<br /></Typography>
                    <TextField
                        fullWidth required variant="filled" label="Password" onChange={e => { setMsg(''); setPasserr(''); setPassword(e.target.value) }} onBlur={e => { validatePassword(); }} error={!!passerr} helperText={passerr}
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
                </form>
            </Box>
        </Box>
    )
}

export default Account;