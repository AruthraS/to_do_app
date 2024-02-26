import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { useUser } from './UserContext';

const Add = () => {
    const { user } = useUser();
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const navigate = useNavigate();
    const credential = user.username;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/add/", { task, date, time, credential })
            .then((res) => {
                navigate(`/task`);
            })
            .catch(err => { console.log(err) })
    };
    return (
        <Container>
            <Link to={'/task'}><Button variant='contained' style={{ position: 'absolute', backgroundColor: 'white', color: 'black', top: '10px', right: '10px' }}>BACK</Button></Link>
            <Box display='flex' alignItems='center' justifyContent='center' height='100vh' flexDirection='column'>
                <Typography variant='h3' textAlign='center'>ADD</Typography>
                <Box style={{ position: 'relative', border: '3px solid grey', padding: '10px', paddingBottom: '50px', width: '60%' }}>
                    <form onSubmit={handleSubmit}>
                        <Typography variant='h5'>Task<br /></Typography>
                        <TextField required variant='filled' label='Task' style={{ width: '100%' }} onChange={e => setTask(e.target.value)}></TextField>
                        <Typography variant='h5'>Date<br /></Typography>
                        <TextField required variant='filled' label='Date' style={{ width: '100%' }} onChange={e => setDate(e.target.value)}></TextField>
                        <Typography variant='h5'>Time<br /></Typography>
                        <TextField required variant='filled' label='Time' style={{ width: '100%' }} onChange={e => setTime(e.target.value)}></TextField>
                        <Box style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                            <Button variant='contained' style={{ backgroundColor: 'white', color: 'black' }} type='submit'>Submit</Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Container>
    )
}

export default Add