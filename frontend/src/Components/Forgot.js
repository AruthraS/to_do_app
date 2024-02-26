import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Box, Typography, TextField } from '@mui/material';
import axios from 'axios';

const Forgot = () => {
	const [email, setEmail] = useState('');
	const [emailerr, setEmailerr] = useState('');
	const [msg, setMsg] = useState('');
	const validateEmail = () => {
		if (!/\S+@\S+\.\S+/.test(email))
			setEmailerr('Invalid email id');
		else {
			const credential = email;
			axios.post(`http://localhost:8000/signup`, { credential })
				.then((res) => {
					if (res.data === 'invalid') { setEmailerr(''); }
					else { setEmailerr('Email does not exists'); }
				})
				.catch(err => { console.log(err);setEmailerr('Internal Server error'); })
		}
	};
	const handleSubmit = (event) => {
        event.preventDefault();
        if (!(!!emailerr)) {
            axios.post(`http://localhost:8000/forgot`, { email })
                .then(res => {
                    setEmail('');
                    setMsg('Email sent');
                })
                .catch(err => {
					setEmail('');
                    setMsg('Internal Server Error');
                })
        }
    }
	return (
		<Box>
			<Link to={'/'}><Button variant='contained' style={{ position: 'absolute', backgroundColor: 'white', color: 'black', top: '10px', right: '10px' }}>CANCEL</Button></Link>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
				<Typography variant='h4' sx={{ textAlign: 'center' }}>FORGOT PASSWORD<br /></Typography>
				<Box sx={{
					border: '3px solid grey', padding: '10px', width: '90%', maxWidth: '100vh'
				}}>
					{msg &&
							<Typography variant='body2' color='error' sx={{ textAlign: 'center' }}>{msg}</Typography>
					}
					<form onSubmit={handleSubmit}>
						<Typography variant='h6' type='password'>Email<br /></Typography>
						<TextField fullWidth required variant="filled" onChange={e => { setEmailerr(''); setMsg(''); setEmail(e.target.value); }} onBlur={e => { validateEmail(); }} error={!!emailerr} helperText={emailerr} />
						{emailerr &&
							<Typography variant='body2' color='error' sx={{ textAlign: 'center' }}>{emailerr}</Typography>
						}
						<Box sx={{ textAlign: 'center' }}>
							<Button variant='contained' style={{ marginTop: '10px', backgroundColor: 'white', color: 'black', display: 'inline-block' }} type='submit'>Submit</Button>
						</Box>
					</form>
				</Box>
			</Box>
		</Box>
	)
}

export default Forgot