import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { useUser } from './UserContext';

const Update = () => {
    const { sno } = useParams();
    const [cont, setCont] = useState([]);
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const { user } = useUser();
    const credential = user.username;

    useEffect(() => {
        axios.get(`http://localhost:8000/updat/${sno}/${credential}`)
            .then(res => {
                setCont(res.data);
                setTask(res.data[0].content);
                setDate(res.data[0].dd);
                setTime(res.data[0].dt);
            })
            .catch(err => { console.log(err); })
    }, [sno, credential]);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8000/update/`, { task, date, time, sno })
            .then((res) => {
                navigate(`/task`);
            })
            .catch(err => { console.log(err + 'hi') })
    };
    return (
        <Container>
            <Link to={'/task'}><Button variant='contained' style={{ position: 'absolute', backgroundColor: 'white', color: 'black', top: '10px', right: '10px' }}>BACK</Button></Link>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
                <Typography variant='h3' textAlign='center'>UPDATE</Typography>
                <Box style={{ border: '3px solid grey', padding: '10px', width: '90%', maxWidth: '100vh' }}>
                    <form onSubmit={handleSubmit}>
                        {
                            cont.map((data) => (
                                <Container key={data.sno}>
                                    <Typography variant='h5'>Task<br /></Typography>
                                    <TextField required variant='filled' label='Task' style={{ width: '100%' }} onChange={e => setTask(e.target.value)} defaultValue={data.content}></TextField>
                                    <Typography variant='h5'>Date<br /></Typography>
                                    <TextField required variant='filled' label='Date' style={{ width: '100%' }} onChange={e => setDate(e.target.value)} defaultValue={data.dd}></TextField>
                                    <Typography variant='h5'>Time<br /></Typography>
                                    <TextField required variant='filled' label='Time' style={{ width: '100%' }} onChange={e => setTime(e.target.value)} defaultValue={data.dt}></TextField>
                                    <Box style={{ textAlign: 'center', marginTop: '10px' }}>
                                        <Button variant='contained' style={{ backgroundColor: 'white', color: 'black' }} type='submit'>Submit</Button>
                                    </Box>
                                </Container>

                            ))
                        }
                    </form>
                </Box>
            </Box>
        </Container>
    )
}

export default Update